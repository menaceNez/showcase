/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
// import { useSearchParams } from "next/navigation";

export default function Search({
  placeholder,
  total_pages,
}: {
  placeholder: string;
  total_pages: number;
}) {
  const searchParams = useSearchParams(); // to get searchParameters
  const pathname = usePathname(); // to get current pathname, prepended to searchParams
  const { replace } = useRouter();
  // debouncing refreshes time on callback execution
  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }

    replace(`${pathname}?${params.toString()}`);
  }, 500);

  function handlePage(page: number) {
    const params = new URLSearchParams(searchParams);

    if (page > 0) {
      // if the page is greater than 0
      params.set("page", page.toString());
    } else {
      params.delete("page");
    }

    replace(`${pathname}?${params.toString()}`);
  }
  const handleLoc = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if(term.length > 60) { 
      term = term.substring(0,59)
    }

    if (term) {
      params.set("loc", term);
    } else {
      params.delete("loc");
    }

    replace(`${pathname}?${params.toString()}`);
  }, 200);

  // have total pages, and min display an array of strings being numbers
  // < 1 2 ... 5 > overall idea for design
  // < 1 2 ... 4 >
  // < 1 2 3 >
  const [pagination, setPagination] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  function updatePage() {
    // updates the state of our pagination
    const updated: string[] = [];

    if (currentPage > total_pages - 4) {
      // total pages < 4

      for (let i = currentPage; i <= total_pages; i++) {
        updated.push(i.toString());
      }
    } else {
      // display first page to go back or next 3 pages + ... which
      updated.push(currentPage.toString());
      updated.push((currentPage + 1).toString());
      updated.push((currentPage + 2).toString());
      updated.push((currentPage + 3).toString());
      updated.push("..."); // increments 4
      updated.push(total_pages.toString());
    }

    setPagination(updated);
  }

  // updates the state of our currentPage
  function updateCurrent(data: string) {
    const num = Number(data);

    if (data === "...") {
      setCurrentPage((prev) => prev + 4);
    } else {
      setCurrentPage(num);
    }
  }

  useEffect(() => {
    updatePage();
    handlePage(1);
  }, [total_pages]);

  useEffect(() => {
    if (currentPage > total_pages) setCurrentPage(total_pages);
    handlePage(currentPage);
    updatePage();
  }, [currentPage]);

  const [charLim, setCharLim] = useState<number>(0);

  return (
    <main className="w-[90%] min-w-200 mb-2">
      <div className="px-4 h-52 mx-40 flex flex-col justify-center items-center text-left bg-black/90 border-4  rounded-4xl shadow shadow-black">
        <div className="w-full flex flex-col items-center justify-center overflow-auto">
          <label className="text-white">Search for bird:</label>
          <input
            placeholder={placeholder}
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
            defaultValue={searchParams.get("query")?.toString()}
            alt={"SearchField"}
            className="border rounded w-full pl-1.5 text-white mb-2"
          />

          <label htmlFor="location" className="text-white indent-2">Add a location:</label>
          <span className="w-full flex items-center">
            <input type="text" name="location" defaultValue={""} onChange={(e) => {setCharLim(e.target.value.length); handleLoc(e.target.value)}} placeholder="Ex: Riverside, La Crosse" className="border rounded w-full pl-1.5 text-white mb-2 mr-1" />
            <p className="text-white text-center text-[8px]">{charLim}/60</p>
          </span>
          {charLim > 60 && (<p className="text-red-500 text-sm">Location must be less than 60 characters!</p>)}

        </div>
        <div className="w-full flex flex-row ml-1.5 justify-center items-center">
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1 ? true : false}
            className={currentPage === 1 ? "btn-pag-nohover" : "btn-pag"}
          >
            Start
          </button>
          <button
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1 ? true : false}
            className={currentPage === 1 ? "btn-pag-nohover" : "btn-pag"}
          >
            Prev
          </button>
          {pagination.map((data, index) => (
            <button
              key={index}
              disabled={currentPage === Number(data) ? true : false}
              onClick={() => updateCurrent(data)}
              className={
                currentPage === Number(data) ? "btn-pag-nohover" : "btn-pag"
              }
            >
              {data}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage === total_pages ? true : false}
            className={
              currentPage === total_pages ? "btn-pag-nohover" : "btn-pag"
            }
          >
            Next
          </button>
        </div>
      </div>
    </main>
  );
}
