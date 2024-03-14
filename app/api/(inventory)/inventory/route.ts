import { createInventory } from '@/actions/inventory/createInventory';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const result = await createInventory(body);
  return NextResponse.json(result);
}
