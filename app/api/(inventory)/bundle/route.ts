import { createBundle } from '@/actions/sheet/create';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const result = await createBundle(body);
  return NextResponse.json(result);
}
