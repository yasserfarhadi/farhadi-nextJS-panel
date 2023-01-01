import { NextURL } from 'next/dist/server/web/next-url';
import { type NextRequest, NextResponse } from 'next/server';

export default async function middleware(req: NextRequest) {
  const token = req.cookies.get('access-token')?.value as string;
  const url = req.nextUrl.clone();
  if (url.pathname === '/login') {
    if (token) {
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  }
  if (url.pathname === '/hubs' || url.pathname === 'add-hub') {
    if (!token) {
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}
