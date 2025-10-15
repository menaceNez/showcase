import { getAllSavedByUser } from "@/app/lib/data/db"
import { Birds } from "@/app/lib/types/UserList";
import { UserBirdsTable } from "@/app/lib/ui/table/userBirds";
import { auth } from "@/auth";

export default async function Page(props: { params: Promise<{id: string}>}) {
  const params = await props.params;
  const id = params.id;
  const user = await auth();

  if(!user || user.user?.name !== id) {
    return (
    <main className="w-full text-center">
      403: Forbidden
    </main>
    );
  }
  const birds: Birds[] = await getAllSavedByUser(id);

  return (
    <main className="w-full">
        {
            <UserBirdsTable birds={birds} />
        } 
    </main>
  );
}