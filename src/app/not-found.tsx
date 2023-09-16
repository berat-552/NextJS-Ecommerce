"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function NotFound() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center leading-10 min-h-screen">
      <h1 className="font-medium text-xl sm:text-2xl md:text-3xl">
        404 Not Found
      </h1>
      <p className="text-md">Please try again.</p>
      <Link
        href={".."}
        onClick={() => router.refresh()}
        className="font-medium text-xl btn btn-primary"
      >
        Return Home
      </Link>
    </div>
  );
}
