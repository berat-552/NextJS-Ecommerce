"use client";
import React, { useState } from "react";
import Link from "next/link";
export default function SearchButton() {
  // toggle state
  const [showSearchBar, setShowSearchBar] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      {showSearchBar && (
        <div className="form-control">
          <div className="flex items-center justify-center">
            <input
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
              placeholder="Search"
              className={`input relative input-bordered w-[11rem] md:w-auto`}
            />

            <Link
              href={`/search/${searchQuery}`}
              type="submit"
              className="text-2xl mx-4"
              onClick={() => {
                setShowSearchBar(false);
                setSearchQuery("");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </Link>
          </div>
        </div>
      )}
      <button
        className={`btn btn-ghost btn-circle ${showSearchBar && "hidden"}`}
        onClick={() => setShowSearchBar(!showSearchBar)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          className="h-6 w-6"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>
    </>
  );
}
