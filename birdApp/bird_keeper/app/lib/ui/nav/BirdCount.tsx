'use client';

import { Session } from "next-auth";
import { useCount } from "../../contexts/BirdContext";
import { useEffect } from "react";

export default function BirdCount({ session }: {session: Session}) {
  // const [birdCount, setBirdCount] = useState(0);
  const {count, refresh} = useCount();
  useEffect(() => {
    refresh();
  }, [session])

  return (
    <div>
      Saved: {count}
    </div>
  );
}