import { getUserBirdCount } from "@/app/lib/data/db";
import { NextResponse } from "next/server";


export async function GET(
  request: Request, 
  { params }: { params: Promise<{ id: string }>}
) {
  const paramss = await params;
  const { id } = paramss;
  const count = await getUserBirdCount(id);

  if(!count && count !== 0) {
    return NextResponse.json({error: 'Not Found'}, {status: 404});
  }

  return NextResponse.json({count: count});
}