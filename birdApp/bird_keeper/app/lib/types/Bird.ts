export type ApiResponse = {
  total_results: number;
  page: number;
  per_page: number;
  results: {
    record: {
      default_photo?: {
        medium_url: string;
        square_url: string;
      };
      taxon_photos?: {
        photo: {
          medium_url: string;
        };
      }[]; // defines that this is an array of objects 
      preferred_common_name: string;
      iconic_taxon_id: number;
    };
  }[]; // results is an array of results objects 
};
