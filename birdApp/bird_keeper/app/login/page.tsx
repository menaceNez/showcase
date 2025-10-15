// import { Suspense } from "react";
import Login from "../lib/login/Login";
import { SessionProvider } from "next-auth/react";

export default function Page() {
  return (
    <main className="w-full flex justify-center items-center flex-col text-white">
      {/* <h1 className="text-9xl text-black m-4">Welcome!</h1> */}
      <SessionProvider>
        <Login />
      </SessionProvider>
    </main>
  );
}