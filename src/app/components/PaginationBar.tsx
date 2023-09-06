import Link from "next/link";
import React from "react";
import { PaginationBarProps } from "@/types/types";

export default function PaginationBar({
  currentPage,
  totalPages,
}: PaginationBarProps) {
  const maxPage = Math.min(totalPages, Math.max(currentPage + 4, 10));

  const minPage = Math.max(1, Math.min(currentPage - 5, maxPage - 9));

  // array with JSX items
  const numberedPageItems: JSX.Element[] = [];

  // fill array with items
  for (let page = minPage; page <= maxPage; page++) {
    numberedPageItems.push(
      // page param
      <Link
        href={`?page=${page}`}
        key={page}
        className={`join-item btn ${
          currentPage === page ? "btn-active pointer-events-none" : ""
        }`}
      >
        {page}
      </Link>
    );
  }

  return (
    <>
      {/* show only on large screens */}
      <div className="join hidden sm:block mb-2">{numberedPageItems}</div>

      {/* show only on small screens */}
      <div className="join block sm:hidden">
        {currentPage > 1 && (
          <Link href={`?page=${currentPage - 1}`} className="btn join-item">
            «
          </Link>
        )}

        <button className="join-item btn pointer-events-none">
          Page {currentPage}
        </button>

        {currentPage < totalPages && (
          <Link href={`?page=${currentPage + 1}`} className="btn join-item">
            »
          </Link>
        )}
      </div>
    </>
  );
}
