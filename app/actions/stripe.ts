'use server'

import { stripe } from '@/lib/stripe'

const PRICE_ID = process.env.STRIPE_PRICE_ID
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://cluttered.dev'

export async function createCheckoutSession(email?: string) {
  if (!PRICE_ID) {
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

    return { url: session.url }
  } catch (error) {
    console.error('[Stripe] Checkout error:', error)
    return { error: 'Failed to create checkout session' }
  }
}

export async function getSessionDetails(sessionId: string) {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['payment_intent'],
    })

    if (session.payment_status !== 'paid') {
      return { error: 'Payment not completed' }
    }

    const paymentIntent = session.payment_intent as import('stripe').Stripe.PaymentIntent

    return {
      licenseKey: paymentIntent?.metadata?.license_key || null,
      email: session.customer_email || null,
    }
  } catch (error) {
    console.error('[Stripe] Session retrieval error:', error)
    return { error: 'Failed to retrieve session' }
  }
}
