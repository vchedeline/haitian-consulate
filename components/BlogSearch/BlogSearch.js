import { useRouter } from "next/router";
import queryString from "query-string";
import { useEffect, useState } from "react";
import { Pagination } from "./Pagination";
import { Results } from "./Results";

export const BlogSearch = () => {
  const [blogs, setBlogs] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const pageSize = 3;
  const router = useRouter();

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
    await router.push(
      `${router.query.slug.join("/")}?page=${[pageNum]}`,
      null,
      {
        shallow: true,
      }
    );
    search();
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
