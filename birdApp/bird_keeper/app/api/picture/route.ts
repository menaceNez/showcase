import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name');

  if(!name) {return NextResponse.json({error: "bad name"}, {status: 404});}

  const encoded = encodeURIComponent(String(name));

  const res = await fetch(`https://api.inaturalist.org/v1/search?q=${encoded}&sources=taxa&include_taxon_ancestors=false&per_page=1`); 

  const data = await res.json(); 

  return NextResponse.json(data);
}