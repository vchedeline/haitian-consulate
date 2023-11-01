import { useEffect, useState } from "react";
import { Results } from "./Results";
import { Pagination } from "./Pagination";

export const BlogSearch = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const search = async () => {
      const response = await fetch(`api/search`);
      const data = await response.json();
      console.log("SEARCH DATA: ", data);
      setBlogs(data.blogs);
    };
    search();
  }, []);

  return (
    <div>
      <Results blogs={blogs} />
      <Pagination />
    </div>
  );
};
