"use client";

import { useActionState, useEffect, useState } from "react";
import { saveBird } from "../../actions";
import { useCount } from "../../contexts/BirdContext";
import { useSearchParams } from "next/navigation";

export default function SaveBird({
  comName,
  user_id,
  imgUrl,
  location,
}: {
  comName: string;
  user_id: string;
  imgUrl: string;
  location: string;
}) {
  const { incrementNumber } = useCount();
  const [added, setAdded] = useState(false);
  const searchParams = useSearchParams().get("query");
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    // when a new search is made reset all messages to dont show message
    setShowMessage(false);
    // console.log("changing state: ", showMessage, searchParams);
  }, [searchParams]);

  const saveBirdWrapper = async (
    prevState: string | undefined,
    formData: FormData
  ) => {
    const ret = await saveBird(prevState, formData);
    if (!ret) {
      incrementNumber();
      setAdded(true);
    }

    return ret;
  };

  const [errorMessage, formAction, isPending] = useActionState(
    saveBirdWrapper, // wrapper allows increment of birdCount context
    undefined
  );

  return (
    <main aria-disabled={isPending} className="relative z-0">
      <form
        action={formAction}
        className="flex flex-col items-center justify-center"
      >
        <input type="hidden" name="comName" value={comName ?? ""} />
        <input type="hidden" name="user_id" value={user_id} />
        <input type="hidden" name="imgUrl" value={imgUrl} />
        <input type="hidden" name="location" value={location} />
        <button
          type="submit"
          disabled={isPending}
          className="bg-yellow-300 rounded border hover:bg-yellow-200 text-black cursor-pointer px-2"
          onClick={() => setShowMessage(true)}
        >
          Save
        </button>
      </form>
      {errorMessage === undefined && added && showMessage && (
        <>
          <p className="text-green-500 text-sm">Bird added!</p>
        </>
      )}
      {errorMessage && showMessage && (
        <>
          <p className="text-red-500 text-sm">{errorMessage}</p>
        </>
      )}
    </main>
  );
}
