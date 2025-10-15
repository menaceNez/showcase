'use client';

import { useActionState, useEffect, useState } from "react";
import { register } from "../actions";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const [errorMessage, formAction, isPending] = useActionState(
    register,
    undefined
  );
  const [msg, setMsg] = useState<string>('');
  const [countdown, setCountdown] = useState(-1);
  const router = useRouter();

  useEffect(() => {
    console.log("ERROR MESSAGE CHANGED:", errorMessage)
    if (errorMessage?.startsWith('{')) {
      const { username, password } = JSON.parse(errorMessage);
      console.log("username/pass: ", username, password);
      setMsg('Success!');
      setCountdown(3);

      const interval = setInterval(() => { // update setCountdown every second decrement by 1
        setCountdown((c) => c - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
    else {
      setMsg('');
      setCountdown(-1);
    }
  }, [errorMessage]);

  useEffect(() => { // when countdown === 0 redirect to login
    if (countdown === 0 && msg) {
      router.push('/login');
    }
  }, [countdown, msg, router])

  return (
    <main className="w-full flex justify-center items-center">
      <div className="form-field">
        <form action={formAction} className={"flex justify-center items-center flex-col mb-1"}>
          <h1 className="text-white text-3xl">Register for account</h1>
          <label htmlFor="username" className="text-white">Username:</label>
          <input type="text" name="username" id="username" className="input-field mb-3" />
          <label htmlFor="username" className="text-white">Password:</label>
          <input type="password" name="password" id="password" className="input-field mb-3" />
          <input type="hidden" name="redirectTo" value={callbackUrl} />
          <input type="hidden" name="role" value={'basic'} />
          <button type="submit" className="btn-primary" disabled={isPending}> Register</button>
          {
            (msg && errorMessage) ? <p className="text-green-600 text-sm">Success {countdown}</p> : <p className="text-red-500 text-sm">{errorMessage}</p>
          }
        </form>
        <Link
          href={'/login'}
          className="btn-primary"
        >
          Back To Login
        </Link>

      </div>

    </main>
  );
}
