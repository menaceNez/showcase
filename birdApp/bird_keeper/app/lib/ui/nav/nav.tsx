import { auth, signOut } from "../../../../auth";
import Link from "next/link";
import BirdCount from "./BirdCount";

export default async function Nav() {
  const session = await auth();
  const isLoggedIn = !!session?.user;
  const roleCheck = (): boolean => session?.user.role.trim() === "admin";
  const isAdmin = roleCheck();
  const username = session?.user?.email;
  let upperCased = "";
  // console.log("Admin val: ", isAdmin);

  if (username) {
    const rest = username.substring(1, session?.user?.email!.length);
    upperCased = username[0].toUpperCase() + rest;
  }

  return (
    <nav className="w-full h-14 flex bg-black/80 mb-2 items-center">
      {isLoggedIn && <span className="text-white ml-2">{upperCased}</span>}
      <div className="flex flex-row relative w-full justify-center items-center">
        {/* {session?.user?.email ? <p className={'nav-btn'}>hello: {session?.user?.email}</p> : <></>} */}
        {isAdmin && (
          <>
            <Link href={"/users"} className="nav-btn">
              Admin
            </Link>
          </>
        )}

        <Link href={"/"} className="nav-btn">
          Home
        </Link>

        {!isLoggedIn && (
          <div className="flex">
            <Link href={"/login"} className="nav-btn">
              Login
            </Link>

            <Link href={"/register"} className="nav-btn">
              Register
            </Link>
          </div>
        )}

        {isLoggedIn && (
          <>
            <Link href={"/search"} className="nav-btn">
              Bird Search
            </Link>
            <Link
              href={"/search/" + session.user?.name + "/userbirds"}
              className="nav-btn"
            >
              <BirdCount session={session} />
            </Link>
          </>
        )}
        {/* Show casing two different ways to embed html via a predicate */}
        {isLoggedIn ? (
          <>
            <div className="nav-btn cursor-pointer">
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
              >
                <button className="cursor-pointer" type="submit">
                  SignOut
                </button>
              </form>
            </div>
          </>
        ) : (
          <></>
        )}

        {}
      </div>
    </nav>
  );
}
