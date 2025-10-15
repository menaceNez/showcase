"use client";
// this should probably be a client componenet but i dont feel like changing it rn
import Image from "next/image";
import { ApiResponse } from "../../types/Bird";
import Search from "../forms/search";
import SaveBird from "../forms/savebird";

/**
 * for pagination:
 *    Take fetched data array get number of pages
 */

export default function Table({
  location,
  userId,
  ret,
}: {
  location: string;
  userId: string;
  ret: ApiResponse;
}) {
  // const pagesize = 4;
  const totalPages = Math.ceil(ret!.total_results / ret!.per_page) || 0;
  const results: ApiResponse["results"] = ret!.results;
  const pagination: ApiResponse["results"] = results; // make this pagination array

  return (
    <main className="w-full flex flex-col items-center px-4 h-screen">
      <Search placeholder="Search Birds" total_pages={totalPages} />
      {pagination.length !== 0 && (
        <div className="h-120 content-start grid grid-cols-2 md:grid-cols-4 overflow-auto">
          {pagination.map((bird, index) => (
            <div
              key={index}
              className={
                " h-60 w-60 m-2 bg-black/80 border-black border-4 rounded overflow-hidden flex flex-col justify-center items-center text-white text-center "
              }
            >
              {bird.record.preferred_common_name}
              <div className="w-[80%] text-wrap rounded-2xl overflow-auto">
                <Image
                  src={
                    bird.record.default_photo!.medium_url ||
                    bird.record.default_photo!.square_url
                  }
                  alt={bird.record.preferred_common_name}
                  width={256}
                  height={256}
                  className="rounded-xl"
                />
              </div>
              <div className="mt-1">
                <SaveBird
                  comName={bird.record.preferred_common_name}
                  user_id={userId}
                  imgUrl={
                    bird.record.default_photo!.medium_url ||
                    bird.record.default_photo!.square_url
                  }
                  location={location}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

// {pagination.length === 0 ? (
//   <p className="flex items-center rounded justify-center bg-black/95 text-white h-40 w-[60%] text-center">Results: 0</p>
// ) : (
//   // flex justify-center items-center rounded mb-2 h-180
//   <div className="flex overflow-y-auto h-140 w-[80%]">
//   <table
//     className="
//       table-fixed
//       border-collapse
//       border-white
//       bg-black/95
//       text-white
//       font-mono
//       text-lg
//       rounded
//       w-full
//     "
//   >
//     <thead className="relative z-1">
//       <tr>
//         <th className="theader"> Common Name</th>
//         {/* <th className="border px-2 py-2">Species Name</th> */}
//         <th className="theader">Image</th>
//       </tr>
//     </thead>
//     <tbody className="w-full">
//       {pagination.map((bird, index) => (
//         <tr key={index}>
//           <td className="">
//             <div className="flex justify-center items-center flex-col text-center">
//               {bird.record.preferred_common_name}
//               <SaveBird
//                 comName={bird.record.preferred_common_name}
//                 user_id={userObj!.user!.name!}
//                 imgUrl={
//                   bird.record.default_photo!.medium_url ||
//                   bird.record.default_photo!.square_url
//                 }
//                 location={location}
//               />
//             </div>
//           </td>
//           <td className="w-full h-full">
//             <div className={"flex justify-center items-center overflow-auto"}>
//               <div className={`max-h-[150px] max-w-[200px]  text-wrap rounded-2xl p-4`}>
//                 <Image
//                   src={
//                     bird.record.default_photo!.medium_url ||
//                     bird.record.default_photo!.square_url
//                   }
//                   width={800}
//                   height={400}
//                   alt={bird.record.preferred_common_name || 'noname'}
//                   className="border rounded-2xl"
//                 />
//               </div>
//             </div>
//           </td>
//         </tr>
//       ))}
//     </tbody>
//   </table>

//   </div>
// )}
