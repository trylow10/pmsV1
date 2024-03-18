import { getInventoryById } from '@/data/inventory/inventory.data';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const url = new URL(request.nextUrl);
  const id = url.pathname.split('/').pop();
  const result = await getInventoryById(id);
  return NextResponse.json(result);
}
