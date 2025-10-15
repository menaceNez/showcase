import { NextResponse } from 'next/server';

const headers = new Headers();
headers.append("X-eBirdApiToken", "5fcqmrt35q5");

const reqOptions = {
  method: 'GET',
  headers: headers,
  redirect: 'follow' as RequestRedirect
}

export async function GET() {
  // const { searchParams } = new URL(request.url);
  // const id = searchParams.get(region);
  const data = 
  await fetch("https://api.ebird.org/v2/data/obs/US-WI/recent/notable", reqOptions)
    .then(res => res.json())
    .then(json => {return json;})
    .catch(err => {return err;});

  return NextResponse.json(data);
}