import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import rateLimit from './lib/rate-limit';

const limiter = rateLimit({
  interval: 60 * 1000, // 60 seconds
  uniqueTokenPerInterval: 500, // Max 500 users per second
});

export async function middleware(request: NextRequest) {
  const ip = request.ip || request.headers.get('x-forwarded-for') || '127.0.0.1';
  
  // CORS origin locking
  const origin = request.headers.get('origin');
  const allowedOrigins = ['http://localhost:3000', 'https://yourproductionapp.com'];
  
  // Rate limiting for API routes
  if (request.nextUrl.pathname.startsWith('/api')) {
    // Check CORS
    if (origin && !allowedOrigins.includes(origin)) {
      return new NextResponse('Forbidden: Invalid Origin', { status: 403 });
    }

    try {
      // General API rate limit (100 req per minute)
      let limit = 100;
      
      // Aggressive rate limiting for auth endpoints (10 req per minute)
      if (request.nextUrl.pathname.startsWith('/api/account') || 
          request.nextUrl.pathname.startsWith('/api/plaid') ||
          request.nextUrl.pathname.startsWith('/api/checkout')) {
        limit = 10;
      }
      
      await limiter.check(limit, ip);
    } catch {
      return new NextResponse('Too Many Requests', { status: 429 });
    }

    // CSRF protection for mutations (POST, PUT, DELETE, PATCH)
    if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(request.method)) {
      const csrfToken = request.headers.get('x-csrf-token');
      // Require CSRF token unless it's a Stripe Webhook (which uses a signature)
      if (!csrfToken && !request.nextUrl.pathname.startsWith('/api/webhooks/stripe')) {
        // Uncomment to enforce CSRF strictness:
        // return new NextResponse('Forbidden: CSRF token missing', { status: 403 });
      }
    }
  }

  const response = NextResponse.next();

  if (origin && allowedOrigins.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin);
  }
  
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-csrf-token');
  
  return response;
}

export const config = {
  matcher: [
    '/api/:path*',
  ],
};
