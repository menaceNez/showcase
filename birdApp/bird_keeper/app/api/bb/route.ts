// const headers = new Headers();
// headers.append("X-eBirdApiToken", "5fcqmrt35q5");

// const reqOptions = {
//   method: 'GET',
//   headers: headers,
//   redirect: 'follow' as RequestRedirect
// }

export async function GET() {
  // console.log(request.body);
  // return fetch("https://api.ebird.org/v2/data/obs/US-WI/recent", reqOptions)
  // .then(res => res.json())
  // .then(res => {return Response.json(res)})
  // .catch( err => {return Response.json(err)});
  // const bod = request.body;

  return Response.json({message: "Birds Saved"});
}
