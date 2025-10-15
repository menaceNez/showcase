
import { Birds } from "../types/UserList";

export function getTotalPages(array: Birds[], pagesize: number): number {

  return array.length > 0 ? Math.ceil(array.length / pagesize) : 0 ;
}

export function getNextPage(array: Birds[], pagesize: number, curPage: number): Birds[] {
  const totalpagesize = getTotalPages(array, pagesize);
  const curPageIdx = curPage * pagesize;
  const nextPage = curPageIdx + pagesize;
  // console.log("Inside getNextPage: ", totalpagesize, curPageIdx, nextPage);

  if(nextPage >= totalpagesize) return array.slice(curPageIdx, totalpagesize * pagesize);

  return array.length > 0 ? array.slice(curPage, nextPage) : array;
}

export function getPrevPage(array: Birds[], pagesize: number, curPage: number) {
  const prevPage = curPage - pagesize;
  const curPageIdx = curPage * pagesize;
  // console.log("Inside getNextPage: ", prevPage, curPageIdx);

  if(prevPage === 0) return array.slice(curPageIdx, getTotalPages(array,pagesize) * pagesize);

  return array.length > 0 ? array.slice(curPageIdx, curPage) : array;
}