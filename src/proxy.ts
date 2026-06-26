import { NextRequest, NextResponse } from 'next/server'

export default function proxy(request: NextRequest) {}

export const config = {
	matcher: ['/auth/:path*', '/account/:path*']
}
