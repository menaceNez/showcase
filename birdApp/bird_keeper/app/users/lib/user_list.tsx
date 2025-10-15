"use client";
import { User } from "@/app/lib/types/User";
import { useRouter } from "next/navigation";
import AddUserForm from "./adduser_form";

export default function UserList({ users }: { users: User[] }) {
  const router = useRouter();

  return (
    <div className="flex">
    <div className={"bg-black/95 h-200 w-250 flex justify-evenly flex-col overflow-auto rounded"}>
      <p className="text-xl font-bold mb-1">Select To Edit A User</p>
      <table className={"table-fixed border-collapse w-full"}>
        <thead className="">
          <tr className="">
            <th className="sticky top-0 bg-black">
              id
            </th>
            <th className="sticky top-0 bg-black">
              username
            </th>
            <th className="sticky top-0 bg-black">
              role
            </th>

          </tr>
        </thead>
        <tbody>

          {
            users.map((user) => (
              <tr key={user.id} onClick={() => {router.push(`/users/${user.id}`)}} className="hover:border hover:border-white cursor-pointer">

                <td >
                  {user.id}
                </td>
                <td className="flex justify-center">
                  {user.username}
                </td>
                <td> 
                  {user.role.trim() === '' ? "basic" : user.role.trim()}
                </td>

              </tr>
            ))

          }
        </tbody>
      </table>

    </div>
    <AddUserForm />

    </div>
  );
}