import { NextRequest, NextResponse } from 'next/server'
import { validateLicenseKey } from '@/lib/stripe'

export async function POST(req: NextRequest) {
  try {
    const { key } = await req.json()

    if (!key || typeof key !== 'string') {
      return NextResponse.json({ valid: false, error: 'Invalid request' }, { status: 400 })
    }

    // Only validate Stripe keys (CLUT-S prefix)
    if (!key.startsWith('CLUT-S')) {
      return NextResponse.json({ valid: false, error: 'Invalid key format' }, { status: 400 })
    }

    const result = await validateLicenseKey(key)

    if (result.valid) {
      return NextResponse.json({
        valid: true,
        email: result.email,
        provider: 'stripe',
      })
    }

    return NextResponse.json({ valid: false, error: result.error }, { status: 400 })
  } catch (error) {
    console.error('[License API] Validation error:', error)
    return NextResponse.json({ valid: false, error: 'Validation failed' }, { status: 500 })
  }
}
