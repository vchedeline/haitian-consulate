import { BlogCard } from "./BlogCard";

export const Results = ({ blogs }) => {
  return (
    <div className="max-w-5xl mx-auto grid grid-cols-3 gap-5 mb-10">
      {blogs.map((blog) => (
        <BlogCard
          key={blog.databaseId}
          title={blog.title}
          destination={blog.uri}
          blogTitle={blog.blogFeatures.title}
          image={blog.featuredImage?.node?.sourceUrl}
        />
      ))}
    </div>
  );
};
