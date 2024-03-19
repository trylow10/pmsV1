import { NextRequest, NextResponse } from 'next/server';
import { getAllSheet, getSheetById } from '@/data/inventory/inventory.data';
import { createSheet } from '@/actions/inventory/createInventory';

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const query = url?.searchParams;
  const page = Number(query.get('page')) || 1;
  const result = await getAllSheet({ page: Number(page) });
  return NextResponse.json(result);
}
// export async function GET(request: NextRequest) {
//   const url = new URL(request.nextUrl);
//   const id = url.searchParams.get('id') ?? '';
//   const result = await getSheetById(id);
//   return NextResponse.json(result);
// }

export async function POST(request: NextRequest) {
  const body = await request.json();
  const result = await createSheet(body);
  return NextResponse.json(result);
}
