import { NextRequest, NextResponse } from 'next/server'
import { createCheckoutSession } from '@/app/actions/stripe'

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get('email') || undefined

  const result = await createCheckoutSession(email)

  if (result.error || !result.url) {
    return NextResponse.redirect(new URL('/pricing?error=checkout_failed', req.url))
  }

  return NextResponse.redirect(result.url)
}
