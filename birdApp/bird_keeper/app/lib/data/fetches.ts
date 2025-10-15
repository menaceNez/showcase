import { Count } from "../types/Count";
import { ApiResponse } from "../types/Bird";

export async function iNatSearch(
  name: string,
  page: number
): Promise<ApiResponse | undefined> {
  try {
    if (name === undefined) name = "red";
    if (!page || page < 1) {
      page = 1;
    }
    const encodedName = encodeURIComponent(name);
    const result = await fetch(
      `https://api.inaturalist.org/v1/search?q=${encodedName}&taxon_id=3&sources=taxa&include_taxon_ancestors=false&per_page=100&page=${page}`
    );
    const json: ApiResponse = await result.json();

    json.results = json.results.filter(
      (bird: {
        record: {
          iconic_taxon_id: number;
          default_photo?: { medium_url: string; square_url: string };
        };
      }) =>
        bird.record.iconic_taxon_id === 3 &&
        (!!bird.record.default_photo?.medium_url ||
          !!bird.record.default_photo?.square_url)
    );

    return json;
  } catch (error) {
    console.log("iNatSearch(): Error: ", error);
  }
}

export async function iNatObservations(
  name: string,
  page: number
): Promise<ApiResponse | undefined> {
  try {
    if (!page || page < 1) {
      page = 1;
    }
    const encodedName = encodeURIComponent(name);
    const result = await fetch(
      `https://api.inaturalist.org/v1/observations?q=${encodedName}&taxon_id=3&per_page=1&page=${page}&preferred_place_id=38`
    );
    const json = await result.json();

    // json.results.forEach( resp => {
    //   console.log("Testa: ", resp.record.iconic_taxon_id);
    // })

    return json;
  } catch (error) {
    console.log("iNatSearch(): Error: ", error);
    return undefined;
  }
}

export async function fetchBirdCount(user_id: string) {
  const data = await fetch(`http://localhost:3000/api/birdcounts/${user_id}`, {
    method: "GET",
  });

  if (!data.ok) {
    console.log("databad");
    return null;
  }
  const json: Count = await data.json();
  // console.log("Where am i at: ", json.count[0].count);

  console.log("whassup: ", json.count[0].count);

  return json;
}
