"use client";
import { useEffect, useState } from "react";
import { Results } from "./Results";
import { Pagination } from "./Pagination";
import { useRouter, usePathname } from "next/navigation";
import queryString from "query-string";

export const BlogSearch = () => {
  const [blogs, setBlogs] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const pageSize = 3;
  const router = useRouter();
  const pathName = usePathname();

  const search = async () => {
    const { page } = queryString.parse(window.location.search);
    const response = await fetch(`api/search`, {
      method: "POST",
      body: JSON.stringify({
        page: parseInt(page || "1"),
      }),
    });
    const data = await response.json();
    setBlogs(data.blogs);
    setTotalResults(data.total);
  };

  const handlePageClick = async (pageNum) => {
    router.push(`${pathName.query.slug.join("/")}?page=${[pageNum]}`);
  };

  useEffect(() => {
    search();
  }, []);

  return (
    <div>
      <Results blogs={blogs} />
      <Pagination
        onPageClick={handlePageClick}
        totalPages={Math.ceil(totalResults / pageSize)}
      />
    </div>
  );
};
