import { ButtonLink } from "components/ButtonLink";
import Image from "next/image";
import Link from "next/link";

export const SideBar = ({
  isOpen,
  toggle,
  items,
  callToActionLabel,
  callToActionDestination,
  logo,
}) => {
  return (
    <>
      <div
        className="sidebar-container fixed w-full h-full overflow-auto justify-center bg-white grid pt-[120px] left-0 z-40"
        style={{
          opacity: `${isOpen ? "1" : "0"}`,
          top: ` ${isOpen ? "0" : "-100%"}`,
        }}
      >
        <button className="absolute right-0 p-5" onClick={toggle}>
          {/* Close icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
            />
          </svg>
        </button>
        <div className="sidebar-nav text-center leading-relaxed text-sm">
          <div className="justify-center">
            <Image
              src={logo.sourceUrl}
              alt={logo.title}
              width="300"
              height="200"
              className="relative"
            />
          </div>
          {(items || []).map((item) => (
            <div
              key={item.id}
              className="cursor-pointer relative group my-0 place-self-center"
            >
              <div>
                <Link
                  href={item.destination}
                  className="p-2 block text-blue-950 font-bold"
                  onClick={toggle}
                >
                  {item.label}
                </Link>
              </div>
              {!!item.subMenuItems?.length && (
                <div className="group-hover:block text-center top-full">
                  {item.subMenuItems.map((subMenuItem) => (
                    <Link
                      key={subMenuItem.id}
                      href={subMenuItem.destination}
                      className="block whitespace-nowrap p-5 hover:text-blue-950"
                      onClick={toggle}
                    >
                      {subMenuItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="mt-3 my-auto" onClick={toggle}>
            <ButtonLink
              destination={callToActionDestination}
              label={callToActionLabel}
              btnClass="btn"
            />
          </div>
        </div>
      </div>
    </>
  );
};
