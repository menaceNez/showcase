"use server";

import { getUserById } from "@/app/lib/data/db";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import UserForm from "../lib/user_form";
import { User } from "@/app/lib/types/User";
// import { z } from "zod/v4";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  const params_ = await params;
  const role = session?.user.role;
  console.log("This is aprams: ", params_);

  const id = params_.id;
  console.log(id.length);
  if (id.length !== 36) redirect("/users");
  const user: User = await getUserById(id);

  if (role !== "admin") redirect("/");

  return (
    <main>
      <UserForm user={user} />
    </main>
  );
}
