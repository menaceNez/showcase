"use client";

// import { useSearchParams } from "next/navigation";
import { useActionState, useEffect } from "react";
import { authenticate } from "../actions";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function Login() {
  // const searchParams = useSearchParams();
  const [errorMessage, formAction, isPending] = useActionState(
    // upates the state of the componenet on form submission
    authenticate,
    undefined
  );

  const session = useSession();

  useEffect(() => {
    // console.log("this is session: ", session);
  }, [session]);

  return (
    <form action={formAction} className="form-field">
      {errorMessage && (
        <>
          <p className="text-sm text-red-500 mb-2">{errorMessage}</p>
        </>
      )}
      <label htmlFor="username" className="text-white">
        Username:
      </label>
      <input
        type="text"
        name="username"
        id="username"
        className="input-field"
      />
      <label htmlFor="password" className="text-white">
        Password:
      </label>
      <input
        type="password"
        name="password"
        id="password"
        className="input-field"
      />
      <input type="hidden" name="redirectTo" value={"/search"} />
      <button type="submit" className="btn-primary mb-2" disabled={isPending}>
        {!isPending ? "Login" : "Logging in"}
      </button>
      {/* Add form errors here */}
      <Link href={"/register"} className="btn-primary">
        Register
      </Link>
    </form>
  );
}
