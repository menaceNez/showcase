import { auth } from "@/auth";
import Table from "../lib/ui/table/birdTable";
import { redirect } from "next/navigation";
import { iNatSearch } from "../lib/data/fetches";
import { ApiResponse } from "../lib/types/Bird";

export default async function Page(props: {
  searchParams: Promise<{ query?: string; page?: string; loc?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams.query;
  const page = Number(searchParams.page);
  const location = searchParams?.loc || "";

  const userObj = await auth();
  const userId = userObj?.user.id;
  // console.log("this is ther user obj: ", userObj, userId);
  if (!userObj && !userId) {
    console.log("running a redirect to login @ birdTable.tsx");
    redirect("/login");
  }

  const ret: ApiResponse | undefined = await iNatSearch(query!, page);

  if (!ret)
    return (
      <>
        <div>Fetch Failed</div>
      </>
    );

  return (
    <main className="overflow-hidden w-full h-300">
      <div>
        {/* {Object.entries(userList).map( ([key, value]) => (<div key={key}>{key}: {value.mesg}</div>))} */}

        <Table location={location!} userId={userId!} ret={ret} />
      </div>
    </main>
  );
}
