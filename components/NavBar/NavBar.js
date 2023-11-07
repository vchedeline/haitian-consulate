"use client";
import { ButtonLink } from "components/ButtonLink";
import { Logo } from "components/Logo";
import Link from "next/link";
import { useEffect, useState } from "react";

export const NavBar = ({
  items,
  callToActionLabel,
  callToActionDestination,
  logo,
  toggle,
}) => {
  const [scrollState, setScrollState] = useState(false);

  // Scrolling event
  const handleScroll = () => {
    if (window.scrollY >= 50) setScrollState(true);
    else setScrollState(false);
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className={scrollState ? "menu menuScrolled" : "menu"}>
        <Logo
          logo={logo}
          callToActionDestination={callToActionDestination}
          callToActionLabel={callToActionLabel}
        />
        <div className="md:hidden flex flex-1 justify-end items-center h-full w-1/3">
          <button type="button" onClick={toggle}>
            {/* Menu icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              viewBox="0 0 24 24"
            >
              <path
                fill="#fff"
                d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2Z"
              />
            </svg>
          </button>
        </div>
        <div className="hidden md:flex flex-1 justify-end space-x-4 h-full">
          {(items || []).map((item) => (
            <div
              key={item.id}
              className="hover:bg-blue-950 cursor-pointer flex p-6 relative group h-full justify-center items-center"
            >
              <Link href={item.destination}>{item.label}</Link>
              {!!item.subMenuItems?.length && (
                <div className="group-hover:block hidden bg-blue-960 text-center absolute right-0 top-full -mt-1">
                  {item.subMenuItems.map((subMenuItem) => (
                    <Link
                      key={subMenuItem.id}
                      href={subMenuItem.destination}
                      className="block whitespace-nowrap p-5 hover:bg-blue-950"
                    >
                      {subMenuItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="ml-3 my-auto">
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
