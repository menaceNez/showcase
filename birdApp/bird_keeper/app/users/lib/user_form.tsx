"use client";
import { handleUserForm } from "@/app/lib/actions";
import { User } from "@/app/lib/types/User";
import Link from "next/link";
import { useActionState } from "react";

export default function UserForm({user}: {user: User}) {
    const [message, formAction, isPending] = useActionState(handleUserForm, undefined);
    return (
        <div className="w-full flex items-center justify-center flex-col">
        <form action={formAction} className="w-250 h-200 bg-black/95 flex flex-col items-center rounded-4xl p-4">
            <p className="text-2xl font-bold text-white">Editing Info Of: {user.username}</p>
            <label className="text-white" htmlFor="username">Edit Username:</label>
            <input type="text" name="username" defaultValue={user.username.trim()} className="white-inputs mb-1"/>
            <label className={"text-white"} htmlFor="role">Edit Role:</label>
            <input type="text" name="role" defaultValue={user.role.trim() || 'basic' } className="white-inputs mb-1"/>
            <label className={"text-white"} htmlFor="password">Edit Password:</label>
            <input type="text" name="password" defaultValue={''} className="white-inputs mb-3"/>
            <input type="hidden" name="id" defaultValue={user.id} />
            <button disabled={isPending} type="submit" className="basic-btn mb-2">Submit</button>
            {message && (<p className="text-white text-2xl">{message}</p>)}
            <Link className="basic-btn" href={'/users'}>Back</Link>
        </form>

        </div>
    );
}