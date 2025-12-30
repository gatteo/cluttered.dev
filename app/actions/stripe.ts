'use server'

import { stripe } from '@/lib/stripe'

const PRICE_ID = process.env.STRIPE_PRICE_ID
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://cluttered.dev'

export async function createCheckoutSession(email?: string) {
  console.log('[Stripe Checkout] Creating checkout session')
  console.log('[Stripe Checkout] Email:', email)
  console.log('[Stripe Checkout] Price ID:', PRICE_ID)
  console.log('[Stripe Checkout] Base URL:', BASE_URL)

  if (!PRICE_ID) {
    console.error('[Stripe Checkout] ERROR: STRIPE_PRICE_ID not set')
    return { error: 'Stripe not configured' }
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price: PRICE_ID,
          quantity: 1,
        },
      ],
      customer_email: email || undefined,
      success_url: `${BASE_URL}/purchase/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${BASE_URL}/pricing`,
      metadata: {
        product: 'cluttered_pro',
      },
    })

    console.log('[Stripe Checkout] Session created:', session.id)
    console.log('[Stripe Checkout] Checkout URL:', session.url)
    return { url: session.url }
  } catch (error) {
    console.error('[Stripe Checkout] ERROR:', error)
    return { error: 'Failed to create checkout session' }
  }
}

export async function getSessionDetails(sessionId: string) {
  console.log('[Stripe Session] Getting session details for:', sessionId)

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['payment_intent'],
    })

    console.log('[Stripe Session] Session retrieved')
    console.log('[Stripe Session] Payment status:', session.payment_status)
    console.log('[Stripe Session] Customer email:', session.customer_email)

    if (session.payment_status !== 'paid') {
      console.log('[Stripe Session] Payment not completed')
      return { error: 'Payment not completed' }
    }

    const paymentIntent = session.payment_intent as import('stripe').Stripe.PaymentIntent

    console.log('[Stripe Session] Payment Intent ID:', paymentIntent?.id)
    console.log('[Stripe Session] Payment Intent metadata:', JSON.stringify(paymentIntent?.metadata))

    const licenseKey = paymentIntent?.metadata?.license_key || null
    console.log('[Stripe Session] License key:', licenseKey)

    return {
      licenseKey,
      email: session.customer_email || null,
    }
  } catch (error) {
    console.error('[Stripe Session] ERROR:', error)
    return { error: 'Failed to retrieve session' }
  }
}
