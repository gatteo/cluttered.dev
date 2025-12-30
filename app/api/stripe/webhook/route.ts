import { NextRequest, NextResponse } from 'next/server'
import { stripe, generateLicenseKey } from '@/lib/stripe'
import type Stripe from 'stripe'

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

export async function POST(req: NextRequest) {
  console.log('[Stripe Webhook] ========== WEBHOOK RECEIVED ==========')
  console.log('[Stripe Webhook] Timestamp:', new Date().toISOString())

  if (!webhookSecret) {
    console.error('[Stripe Webhook] ERROR: STRIPE_WEBHOOK_SECRET not set')
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 })
  }

  const body = await req.text()
  const signature = req.headers.get('stripe-signature')

  console.log('[Stripe Webhook] Signature present:', !!signature)
  console.log('[Stripe Webhook] Body length:', body.length)

  if (!signature) {
    console.error('[Stripe Webhook] ERROR: No signature header')
    return NextResponse.json({ error: 'No signature' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    console.log('[Stripe Webhook] Signature verified successfully')
  } catch (err) {
    console.error('[Stripe Webhook] ERROR: Signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  console.log('[Stripe Webhook] Event type:', event.type)
  console.log('[Stripe Webhook] Event ID:', event.id)

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      console.log('[Stripe Webhook] Processing checkout.session.completed')
      const session = event.data.object as Stripe.Checkout.Session

      console.log('[Stripe Webhook] Session ID:', session.id)
      console.log('[Stripe Webhook] Payment status:', session.payment_status)
      console.log('[Stripe Webhook] Payment intent:', session.payment_intent)
      console.log('[Stripe Webhook] Customer email:', session.customer_email)

      if (session.payment_status === 'paid' && session.payment_intent) {
        const licenseKey = generateLicenseKey()
        console.log('[Stripe Webhook] Generated license key:', licenseKey)

        try {
          await stripe.paymentIntents.update(session.payment_intent as string, {
            metadata: {
              license_key: licenseKey,
              customer_email: session.customer_email || '',
              product: 'cluttered_pro',
              activated_at: new Date().toISOString(),
            },
          })
          console.log('[Stripe Webhook] SUCCESS: License key attached to payment intent')
        } catch (updateErr) {
          console.error('[Stripe Webhook] ERROR: Failed to update payment intent:', updateErr)
        }
      } else {
        console.log('[Stripe Webhook] Skipping: payment not paid or no payment_intent')
      }
      break
    }

    case 'payment_intent.succeeded': {
      console.log('[Stripe Webhook] Processing payment_intent.succeeded')
      const paymentIntent = event.data.object as Stripe.PaymentIntent

      console.log('[Stripe Webhook] Payment Intent ID:', paymentIntent.id)
      console.log('[Stripe Webhook] Amount:', paymentIntent.amount)
      console.log('[Stripe Webhook] Current metadata:', JSON.stringify(paymentIntent.metadata))

      const hasLicenseKey = !!paymentIntent.metadata.license_key
      const isClutteredPro = paymentIntent.metadata.product === 'cluttered_pro'

      console.log('[Stripe Webhook] Has license key:', hasLicenseKey)
      console.log('[Stripe Webhook] Is Cluttered Pro:', isClutteredPro)

      if (!hasLicenseKey) {
        // Generate license key for any payment without one (useful for testing)
        const licenseKey = generateLicenseKey()
        console.log('[Stripe Webhook] Generated license key (backup):', licenseKey)

        try {
          await stripe.paymentIntents.update(paymentIntent.id, {
            metadata: {
              ...paymentIntent.metadata,
              license_key: licenseKey,
              product: paymentIntent.metadata.product || 'cluttered_pro',
              activated_at: new Date().toISOString(),
            },
          })
          console.log('[Stripe Webhook] SUCCESS: License key attached to payment intent')
        } catch (updateErr) {
          console.error('[Stripe Webhook] ERROR: Failed to update payment intent:', updateErr)
        }
      } else {
        console.log('[Stripe Webhook] Skipping: license key already exists')
      }
      break
    }

    default:
      console.log('[Stripe Webhook] Ignoring event type:', event.type)
      break
  }

  console.log('[Stripe Webhook] ========== WEBHOOK COMPLETE ==========')
  return NextResponse.json({ received: true })
}
