import { createInventory } from '@/actions/inventory/createInventory';
import {
  getAllInventory,
  getInventoryByBrandId,
} from '@/data/inventory/inventory.data';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const result = await createInventory(body);
  return NextResponse.json(result);
}

// export async function GET(request: Request) {
//   const url = new URL(request.url);
//   const query = url?.searchParams;
//   const page = Number(query.get('page')) || 1;
//   const pageSize = Number(query.get('pageSize')) || 10;
//   const result = await getAllInventory({ page, pageSize });
//   return NextResponse.json(result);
// }

// export async function GET(request: NextRequest) {
//   const url = new URL(request.nextUrl);
//   const id = url.pathname.split('/').pop();
//   const result = await getInventoryByBrandId(id);
//   return NextResponse.json(result);
// }
export async function GET(request: NextRequest) {
  const url = new URL(request.nextUrl);
  const id = url.searchParams.get('id');
  const result = await getInventoryByBrandId(id);
  return NextResponse.json(result);
}
