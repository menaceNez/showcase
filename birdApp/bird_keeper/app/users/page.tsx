'use server';

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getAllUsers } from "../lib/data/db";
import UserList from "./lib/user_list";
import { User } from "../lib/types/User";

/**
 * TODO
 *   list of users and ability to create and update a users role     
 *   so create/edit user and delete user
 *   main page will just hold the list
 *   connects to an update/edit page
 *   each user in main page will have delete button
 * @returns The html that is based from /users
 */
export default async function Page() {
    const session = await auth();
    console.log("users auth(): ", session);
    const role = session?.user.role.trim() ?? '';

    if (role !== 'admin') redirect('/');

    const users: User[] = await getAllUsers();
    users!.sort((a: User, b: User) => a.username.localeCompare(b.username));

    return (
        <main className="w-full h-full">
            <div className="text-white text-center w-full flex justify-center items-center">

                {
                    users !== null ?
                        <>
                            <UserList users={users} />
                        </>
                        :
                        <p className="mx-4 rounded-2xl shadow-black shadow-2xl flex items-center justify-center w-full h-[60%] text-center mt-8 text-6xl bg-black/90 text-white overflow-auto">403 forbidden</p>
                }

            </div>
        </main>
    );
}

