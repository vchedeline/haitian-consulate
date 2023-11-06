import Image from "next/image";

export const SubHeader = ({ subImage, subTitle, align }) => {
  const alignMap = {
    left: "text-align",
    center: "text-center",
    right: "text-right",
  };

  return (
    <div className="h-2/5 text-white bg-slate-800 relative min-h-[300px] flex justify-start items-center">
      <Image
        alt="SubHeader"
        src={subImage}
        fill
        priority={true}
        className="mix-blend-soft-light object-cover blur-sm"
      />
      <div className="w-full pl-6">
        <h1
          className={`${alignMap[align]} font-heading max-w-5xl text-6xl text-left mx-auto my-5`}
        >
          {subTitle}
        </h1>
      </div>
    </div>
  );
};
