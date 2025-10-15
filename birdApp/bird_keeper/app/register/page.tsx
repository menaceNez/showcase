import { Suspense } from "react";
import Register from "../lib/login/Register";

export default function Page() {
  return (
    <Suspense>
      <Register />
    </Suspense>
  );
}