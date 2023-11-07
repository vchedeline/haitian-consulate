import Image from "next/image";
import Link from "next/link";

export const BlogCard = ({ title, destination, blogTitle, image }) => {
  return (
    <Link
      href={destination}
      className="border-2 border-slate-300 p-5 block bg-slate-100 hover:bg-slate-200"
    >
      <div className="flex w-full">
        <Image
          src={image}
          height={200}
          width={300}
          className="object-cover"
          alt=""
        />
      </div>
      <div className="mt-3 text-lg font-bold">{title}</div>
      <div className="text-lg">{blogTitle}</div>
    </Link>
  );
};
