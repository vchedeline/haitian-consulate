import Image from "next/image";

export const Cover = ({ children, background }) => {
  return (
    <div className="h-screen text-white bg-slate-700 relative min-h-[400px] flex justify-center items-center">
      <Image
        alt="Cover"
        src={background}
        fill
        priority={true}
        className="mix-blend-soft-light object-cover"
      />
      <div className="max-w-2xl z-10 ">{children}</div>
    </div>
  );
};
