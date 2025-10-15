"use client";

import { SetStateAction, useActionState, useEffect, useRef, useState } from "react";
import { deleteBird, updateLocationAction } from "../../actions";
import { useCount } from "../../contexts/BirdContext"; // custom hook to decrement counter
import Image from "next/image";
import { Birds } from "../../types/UserList";
import { useDebouncedCallback } from "use-debounce";
// import { getTotalPages, getPrevPage } from "../../util/pagination";

export function DeleteBird({
  // THIS SHOULD BE ITS OWN COMPONENT!!!
  user_id,
  bird_id,
  onDelete,
}: {
  user_id: string;
  bird_id: string;
  onDelete: () => void;
}) {
  const [errorMessage, formAction, isPending] = useActionState(
    async (prevState: string | undefined, formData: FormData) => {
      const result = await deleteBird(prevState, formData);
      if (!result) onDelete();
      return result;
    },
    undefined
  );

  const { decrementNumber } = useCount();

  return (
    <main className="">
      <form
        action={formAction}
        onSubmit={() => {
          if (!errorMessage) {
            decrementNumber();
          }
        }}
      >
        <input type="hidden" name="user_id" value={user_id} />
        <input type="hidden" name="bird_id" value={bird_id} />
        <button
          type="submit"
          disabled={isPending}
          className="bg-red-700 border border-black text-black rounded px-1 hover:bg-red-600 cursor-pointer"
        >
          Delete
        </button>
      </form>

      {errorMessage && (
        <>
          <p className="text-red-500">{errorMessage}</p>
        </>
      )}
    </main>
  );
}

function Search({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  search,
  setSearch,
}: {
  search: string;
  setSearch: React.Dispatch<SetStateAction<string>>;
}) {
  // const searchParams = useSearchParams();
  // const pathName = usePathname();
  // const { replace } = useRouter();

  // useEffect(() => {
  //   const params = new URLSearchParams(searchParams);
  //   params.set("q", `${search}`);
  //   replace(`${pathName}?${params.toString()}`);
  // }, [search]);

  const handleSearch = useDebouncedCallback((e) => {
    setSearch(e.target.value);
  }, 500);

  return (
    <main className={"flex flex-col w-84 m-1"}>
      <span>Filter Favorites</span>
      <input
        type="search"
        placeholder="Filter by name"
        onChange={(e) => handleSearch(e)}
        className="text-black border-2 border-black rounded indent-1 mt-1 bg-white"
      />
    </main>
  );
}

export function UserBirdsTable({ birds }: { birds: Birds[] }) {
  const [msg, setMsg] = useState("");
  const [search, setSearch] = useState("");
  const [birdList, setBirdList] = useState<Birds[]>([]);
  const [currentPage, setCurPage] = useState(1);
  const [pagination, setPagination] = useState<string[]>([]);
  const pageSize = 8;
  const totalPages =
    birds.length === 0 ? 0 : Math.ceil(birds.length / pageSize);

  // const updatePage = () => {};

  const handleDelete = (bird_id: string) => {
    console.log("this is birdid: ", bird_id);
    setBirdList((prev) => prev.filter((b) => b.birdname !== bird_id));
  };

  useEffect(() => {
    const fetchData = async () => {
      return await fetch("/api/bb");
    };

    const data = async () => {
      const msg = await fetchData()
        .then((res) => res.json())
        .then((json) => {
          return json;
        });
      // console.log(msg.message);
      setMsg(msg.message);
    };

    data();
  }, []);

  useEffect(() => {
    if (search !== "") {
      const ret = birds.filter((b) =>
        b.birdname.toLowerCase().includes(search.toLowerCase())
      );
      setBirdList(ret);
    }
  }, [search]);

  useEffect(() => {
    const winStartIdx = (currentPage - 1) * pageSize;
    const winEndIdx =
      currentPage === totalPages ? birds.length : winStartIdx + pageSize;
    const window = birds.slice(winStartIdx, winEndIdx);
    setBirdList(window);

    // update pagination array
    const updated: string[] = [];

    if (currentPage > totalPages - 4) {
      // total pages < 4

      for (let i = currentPage; i <= totalPages; i++) {
        updated.push(i.toString());
      }
    } else {
      // display first page to go back or next 3 pages + ... which
      updated.push(currentPage.toString());
      updated.push((currentPage + 1).toString());
      updated.push((currentPage + 2).toString());
      updated.push((currentPage + 3).toString());
      updated.push("..."); // increments 4
      updated.push(totalPages.toString());
      console.log("updated now: ", updated);
    }

    setPagination(updated);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const incrementPage = () => {
    setSearch("");
    if (currentPage !== totalPages) {
      setCurPage((prev) => prev + 1);
    }
  };
  const decrementPage = () => {
    setSearch("");
    if (currentPage !== 1) {
      setCurPage((prev) => prev - 1);
    }
  };

  const setPage = (pag: string) => {
    setSearch("");
    if (pag === "...") {
      setCurPage((prev) => prev + 4);
    } else {
      setCurPage(Number(pag));
    }
  };

  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>('');
  const [birdName, setBirdName] = useState<string>('');
  const [canSubmit, setCanSubmit] = useState<boolean>(true);

  const updateLocWrapper = async (prevState: string | undefined, formData: FormData) => {
    const birdname = formData.get('birdname') as string;
    const updatedLocation = formData.get('location') as string;
    const ret = await updateLocationAction(prevState, formData);

    if (!ret) {
      setEditText(updatedLocation);
      setBirdList(prev => prev.map(bird =>  // to update a field in a 
        // list map over the list to return a new one and if an object that matches, 
        // copy the rest of the fields, updating the one we want otherwise return the current object
        bird.birdname === birdname ? { ...bird, location: updatedLocation } : bird));
      setShowEdit(false);
    }

    return ret;
  }
  const [errorMessage, formAction, isPending] = useActionState(updateLocWrapper, undefined);
  const [charCount, setCharCount] = useState<number>(0);
  const updateLocRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showEdit) updateLocRef.current?.focus(); //focus on the pop up window's input field
  }, [showEdit])

  return (
    <main className="relative flex justify-center items-center flex-col w-full h-full">
      {/* This is conditional pop-up for editing the message*/}
      {showEdit && (
        <div className="z-10 absolute w-100 h-100 bg-black/95 rounded-xl text-black flex justify-center items-center flex-col">
          <span className="flex items-center justify-center w-5 h-6 font-bold absolute top-2 right-2 px-1 rounded cursor-pointer bg-white text-red-500 overflow-hidden hover:bg-gray-200" onClick={() => setShowEdit(false)}>X</span>
          <form action={formAction} className="flex flex-col items-center justify-center">
            <label className="text-white">Edit the location:</label>
            <input type="text" onChange={(e) => { const charLen = e.target.value.length; setCharCount(charLen); if (charLen > 60) setCanSubmit(false); else setCanSubmit(true); console.log(charLen > 60, canSubmit, isPending, canSubmit || isPending) }} name="location" defaultValue={editText} ref={updateLocRef} className=" w-60 rounded border-black bg-white p-2 text-sm" />
            <p className="text-white">{charCount}/60</p>
            <input type="hidden" name="birdname" defaultValue={birdName} />
            <button type='submit' disabled={!canSubmit} className={!canSubmit ? "bg-amber-500 rounded hover:bg-red-600 px-2 py-2 cursor-default mt-1" : "bg-amber-500 rounded hover:bg-amber-400 px-2 py-2 cursor-pointer mt-1"}>Update Location</button>
          </form>
          {errorMessage && (<p className="text-red-500">DB ERROR: {errorMessage}</p>)}
        </div>
      )
      }

      {msg !== "" ? <p className="w-full flex text-center justify-center items-center text-black text-4xl m-1">{msg}</p> : <></>}
      <div
        className={
          "flex items-center justify-center bg-black/80 w-120 h-30 rounded-2xl flex-col text-white overflow-auto"
        }
      >
        <Search search={search} setSearch={setSearch} />
        <div className="flex flex-row justify-center">
          <button className={"btn-pag"} onClick={() => setCurPage(1)}>
            Start
          </button>
          <button className={"btn-pag"} onClick={decrementPage}>
            Prev
          </button>
          {pagination.map((pag, index) => (
            <div className={"btn-pag"} key={index}>
              <button onClick={() => setPage(pag)}>{pag}</button>
            </div>
          ))}
          <button className={"btn-pag"} onClick={incrementPage}>
            Next
          </button>
        </div>
      </div>

      {birdList.length !== 0 && (
        <div className="h-180 content-start grid grid-cols-2 md:grid-cols-4 overflow-auto">
          {birdList.map((bird, index) => (
            <div
              key={index}
              className={
                " h-60 w-60 m-2 bg-black/80 border-black border-4 rounded overflow-hidden flex flex-col justify-center items-center text-white text-center "
              }
            >

              {bird.birdname}
              <div className="w-[80%] text-wrap rounded-2xl overflow-auto">
                <Image
                  src={bird.birdimage}
                  alt={bird.birdname}
                  width={256}
                  height={256}
                  className="rounded-xl"
                />
              </div>
              {
                bird.location && (
                  <p className="w-full whitespace-normal break-words text-[10px] mt-1">
                    {bird.location}
                  </p>
                )
              }
              <div className="mt-1">
                <button
                  onClick={() => { setShowEdit(true); setEditText(bird.location); setBirdName(bird.birdname); }}
                  className="relative cursor-pointer bg-yellow-500 rounded text-black border-black px-2 mb-1 hover:bg-yellow-400">
                  Edit
                </button>
                <DeleteBird
                  user_id={bird.user_id}
                  bird_id={bird.birdname}
                  onDelete={() => handleDelete(bird.birdname)} // passes a void function to the componenet allowing communication from child to parent
                />
              </div>
            </div>
          ))}
        </div>
      )}
      {birdList.length === 0 && (
        <p className="flex justify-center items-center bg-black mt-4 text-white w-64 h-16 rounded-2xl">
          Empty Favorites
        </p>
      )}
    </main>
  );
}
