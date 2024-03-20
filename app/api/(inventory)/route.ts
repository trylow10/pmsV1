import { createClothDesign } from '@/actions/sheet/create';
import { getAllCloths, getClothById } from '@/data/sheet/data';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const result = await createClothDesign(body);
  return NextResponse.json(result);
}
// export async function GET(request: NextRequest) {
//   const url = new URL(request.nextUrl);
//   const id = url.searchParams.get('id') ?? '';
//   const result = await getClothById(id);
//   return NextResponse.json(result);
// }

export async function GET(request: NextRequest) {
  const url = new URL(request.nextUrl);
  const page = url.searchParams.get('page');
  const result = await getAllCloths({ page: Number(page) });
  return NextResponse.json(result);
}
