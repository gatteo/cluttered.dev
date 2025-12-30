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

  const key = `CLUT-S${segments.join('-')}`
  console.log('[Stripe] Generated license key:', key)
  return key
}

/**
 * Validate a Stripe license key by checking payment metadata.
 */
export async function validateLicenseKey(
  key: string
): Promise<{ valid: boolean; email?: string; error?: string }> {
  console.log('[Stripe Validate] Starting validation for key:', key)

  if (!key.startsWith('CLUT-S')) {
    console.log('[Stripe Validate] Invalid key format')
    return { valid: false, error: 'Invalid key format' }
  }

  try {
    // Search for payments with this license key in metadata
    const searchQuery = `metadata["license_key"]:"${key}"`
    console.log('[Stripe Validate] Search query:', searchQuery)

    const payments = await stripe.paymentIntents.search({
      query: searchQuery,
      limit: 1,
    })

    console.log('[Stripe Validate] Search results count:', payments.data.length)

    if (payments.data.length === 0) {
      console.log('[Stripe Validate] No payment found with this license key')
      return { valid: false, error: 'License key not found' }
    }

    const payment = payments.data[0]
    console.log('[Stripe Validate] Found payment:', payment.id)
    console.log('[Stripe Validate] Payment status:', payment.status)
    console.log('[Stripe Validate] Payment metadata:', JSON.stringify(payment.metadata))

    if (payment.status !== 'succeeded') {
      console.log('[Stripe Validate] Payment not succeeded')
      return { valid: false, error: 'Payment not completed' }
    }

    console.log('[Stripe Validate] License is valid!')
    return {
      valid: true,
      email: payment.metadata.customer_email || undefined,
    }
  } catch (error) {
    console.error('[Stripe Validate] ERROR:', error)
    return { valid: false, error: 'Validation failed' }
  }
}
