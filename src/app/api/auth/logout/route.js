import { NextResponse } from 'next/server';


export async function POST() {
  const res = NextResponse.json({ success: true })

  // Clear the cookie by setting maxAge to 0
  res.cookies.set('token', '', {
    httpOnly: true,
    path: '/',
    maxAge: 0,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  })

  res.cookies.set('role', '', {
    httpOnly: true, 
    path: '/',
    maxAge: 0,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
});
  return res
}