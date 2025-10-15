import { register } from "@/app/lib/actions";
import { useActionState } from "react";

export default function AddUserForm() {
  const [message, formAction, isPending] = useActionState(register, undefined);
  return (
      <form action={formAction} className="flex flex-col items-center h-200 w-80 bg-black/95 ml-4 overflow-auto rounded">
      <p className="text-xl font-bold">Insert A User</p>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" className="border border-white bg-black text-white indent-1 rounded" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" className="border border-white bg-black text-white indent-1 rounded" />
        <label htmlFor="role">Role</label>
        <input type="text" name="role" className="border border-white bg-black text-white indent-1 rounded" />
        <button disabled={isPending} type="submit" className="nav-btn cursor-pointer bg-gray-900 rounded hover:bg-gray-800 active:bg-gray-500">Insert</button>
        {message && (<p>{message}</p>)}

      </form>
  );
}