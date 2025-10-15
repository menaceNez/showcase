"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { getUserBirdCount } from "../data/db";

// create a type for the context
type NumberBirdsSaved = {
  count: number;
  incrementNumber: () => void;
  decrementNumber: () => void;
  refresh: () => void;
};
// create context function call
const CountContext = createContext<NumberBirdsSaved | null>(null);

// create a provider Provider supplies the function and
export const CountProvider = ({
  userid,
  children,
}: {
  children: React.ReactNode;
  userid: string;
}) => {
  const [count, setCount] = useState<number>(0);
  // get the initial amount of favorites
  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refresh = async () => {
    const counted = await getUserBirdCount(userid);
    const parsed: number = counted[0].count;
    setCount(parsed);
  };

  const incrementNumber = () =>
    setCount((prev: number) => {
      // console.log("what isprev: " ,typeof(prev))
      const inc: number = Number(prev) + 1;
      return inc;
    });
  const decrementNumber = () =>
    setCount((prev: number) => {
      const dec: number = Number(prev) - 1;
      return dec;
    });

  // const updateCount = async (newCount: number) => {
  //   const res = await getUserBirdCount(userid);
  //   console.log("fetching it", res);
  //   setCount(444);
  // }

  return (
    <CountContext.Provider
      value={{ count, incrementNumber, decrementNumber, refresh }}
    >
      {children}
    </CountContext.Provider>
  );
};

export const useCount = () => {
  const context = useContext(CountContext);
  if (!context) throw new Error("useCount Hook failed");
  return context;
};
