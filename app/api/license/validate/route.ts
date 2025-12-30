import { NextRequest, NextResponse } from 'next/server'
import { validateLicenseKey } from '@/lib/stripe'

export async function POST(req: NextRequest) {
  console.log('[License API] ========== VALIDATION REQUEST ==========')
  console.log('[License API] Timestamp:', new Date().toISOString())

  try {
    const body = await req.json()
    console.log('[License API] Request body:', JSON.stringify(body))

    const { key } = body

    if (!key || typeof key !== 'string') {
      console.log('[License API] ERROR: Invalid request - no key provided')
      return NextResponse.json({ valid: false, error: 'Invalid request' }, { status: 400 })
    }

    console.log('[License API] Validating key:', key)

    // Only validate Stripe keys (CLUT-S prefix)
    if (!key.startsWith('CLUT-S')) {
      console.log('[License API] ERROR: Invalid key format - must start with CLUT-S')
      return NextResponse.json({ valid: false, error: 'Invalid key format' }, { status: 400 })
    }

    const result = await validateLicenseKey(key)
    console.log('[License API] Validation result:', JSON.stringify(result))

    if (result.valid) {
      console.log('[License API] SUCCESS: License is valid')
      return NextResponse.json({
        valid: true,
        email: result.email,
        provider: 'stripe',
      })
    }

    console.log('[License API] FAILED: License is not valid')
    return NextResponse.json({ valid: false, error: result.error }, { status: 400 })
  } catch (error) {
    console.error('[License API] ERROR: Validation error:', error)
    return NextResponse.json({ valid: false, error: 'Validation failed' }, { status: 500 })
  }
}
