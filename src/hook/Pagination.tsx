import { useState, useMemo, useEffect } from "react";

export const usePagination = <T,>(items: T[], itemsPerPage: number = 10) => {
  const [page, setPage] = useState(1);

  const FIRST_PAGE = 1;
  const PAGE_STEP = 1;

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const pageItems = useMemo(() => {
    const start = (page - FIRST_PAGE) * itemsPerPage;
    const end = start + itemsPerPage;
    return items.slice(start, end);
  }, [items, page, itemsPerPage]);

  const nextPage = () => setPage((p) => Math.min(p + PAGE_STEP, totalPages));
  const prevPage = () => setPage((p) => Math.max(p - PAGE_STEP, FIRST_PAGE));
  const goToPage = (n: number) => {
    if (n >= FIRST_PAGE && n <= totalPages) setPage(n);
  };

  useEffect(() => {
    setPage(FIRST_PAGE);
  }, [items]);

  return {
    page,
    totalPages,
    pageItems,
    nextPage,
    prevPage,
    goToPage,
  };
};
