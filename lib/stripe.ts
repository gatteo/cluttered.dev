import Stripe from 'stripe'

// Lazy initialization to avoid build-time errors
let _stripe: Stripe | null = null

export function getStripe(): Stripe {
  if (!_stripe) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY is not set')
    }
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-12-15.clover',
      typescript: true,
    })
  }
  return _stripe
}

// Proxy for backwards compatibility - lazily gets the Stripe instance
export const stripe = new Proxy({} as Stripe, {
  get(_, prop: keyof Stripe) {
    return getStripe()[prop]
  },
})

/**
 * Generate a unique license key for Stripe purchases.
 * Format: CLUT-SXXX-XXXX-XXXX (S prefix distinguishes from Paddle)
 */
export function generateLicenseKey(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // Excludes confusing chars (0, O, I, 1)
  const segments = []

  for (let i = 0; i < 3; i++) {
    let segment = ''
    for (let j = 0; j < 4; j++) {
      segment += chars[Math.floor(Math.random() * chars.length)]
    }
    segments.push(segment)
  }

  return `CLUT-S${segments.join('-')}`
}

/**
 * Validate a Stripe license key by checking payment metadata.
 */
export async function validateLicenseKey(
  key: string
): Promise<{ valid: boolean; email?: string; error?: string }> {
  if (!key.startsWith('CLUT-S')) {
    return { valid: false, error: 'Invalid key format' }
  }

  try {
    // Search for payments with this license key in metadata
    const payments = await stripe.paymentIntents.search({
      query: `metadata["license_key"]:"${key}"`,
      limit: 1,
    })

    if (payments.data.length === 0) {
      return { valid: false, error: 'License key not found' }
    }

    const payment = payments.data[0]

    if (payment.status !== 'succeeded') {
      return { valid: false, error: 'Payment not completed' }
    }

    return {
      valid: true,
      email: payment.metadata.customer_email || undefined,
    }
  } catch (error) {
    console.error('[Stripe] License validation error:', error)
    return { valid: false, error: 'Validation failed' }
  }
}
