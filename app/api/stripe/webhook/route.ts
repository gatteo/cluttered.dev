import { NextRequest, NextResponse } from 'next/server'
import { stripe, generateLicenseKey } from '@/lib/stripe'
import type Stripe from 'stripe'

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

export async function POST(req: NextRequest) {
  if (!webhookSecret) {
    console.error('[Stripe Webhook] STRIPE_WEBHOOK_SECRET not set')
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 })
  }

  const body = await req.text()
  const signature = req.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    console.error('[Stripe Webhook] Signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session

      if (session.payment_status === 'paid' && session.payment_intent) {
        // Generate license key and attach to payment intent
        const licenseKey = generateLicenseKey()

        await stripe.paymentIntents.update(session.payment_intent as string, {
          metadata: {
            license_key: licenseKey,
            customer_email: session.customer_email || '',
            product: 'cluttered_pro',
            activated_at: new Date().toISOString(),
          },
        })

        console.log(`[Stripe Webhook] License key generated: ${licenseKey} for ${session.customer_email}`)
      }
      break
    }

    case 'payment_intent.succeeded': {
      // Backup: if checkout.session.completed didn't fire, handle here
      const paymentIntent = event.data.object as Stripe.PaymentIntent

      if (!paymentIntent.metadata.license_key && paymentIntent.metadata.product === 'cluttered_pro') {
        const licenseKey = generateLicenseKey()

        await stripe.paymentIntents.update(paymentIntent.id, {
          metadata: {
            ...paymentIntent.metadata,
            license_key: licenseKey,
            activated_at: new Date().toISOString(),
          },
        })

        console.log(`[Stripe Webhook] License key generated (backup): ${licenseKey}`)
      }
      break
    }

    default:
      // Ignore other events
      break
  }

  return NextResponse.json({ received: true })
}
