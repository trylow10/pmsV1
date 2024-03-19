import { createBrand } from '@/actions/inventory/createInventory';
import { getBrands } from '@/data/inventory/inventory.data';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const result = await createBrand(body);
  return NextResponse.json(result);
}
export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = url?.searchParams;
  const page = Number(query.get('page')) || 1;
  const pageSize = Number(query.get('pageSize')) || 10;
  const result = await getBrands({ page, pageSize });
  return NextResponse.json(result);
}
