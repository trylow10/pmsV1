import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const url = new URL(request.nextUrl);
  console.log(url.searchParams.get('q'));

  return NextResponse.json('hehe');
}
