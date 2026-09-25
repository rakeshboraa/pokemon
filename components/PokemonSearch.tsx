"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PokemonSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const urlSearch = searchParams.get("search") ?? "";
  const [search, setSearch] = useState(urlSearch);
  useEffect(() => {
    const value = search.trim();
    if (value === urlSearch) return;
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set("search", value);
      } else {
        params.delete("search");
      }
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname);
    }, 300);
    return () => clearTimeout(timeout);
  }, [search, urlSearch, pathname, router, searchParams]);

  return (
    <div className="mb-10 flex justify-center">
      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search "
        aria-label="Search "
        className="w-full max-w-xl rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-yellow-300 focus:ring-2 focus:ring-yellow-200"
      />
    </div>
  );
}
