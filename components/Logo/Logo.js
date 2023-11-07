"use client";
import { ButtonLink } from "components/ButtonLink";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export const Logo = ({ logo, callToActionDestination, callToActionLabel }) => {
  const [width, setWidth] = useState(0);
  const [showButton, setShowButton] = useState(false);

  // change between the logo and the button when the user scrolls
  const changeNavButton = () => {
    if (window.scrollY >= 400 && window.innerWidth < 768) setShowButton(true);
    else setShowButton(false);
  };
  useEffect(() => {
    window.addEventListener("scroll", changeNavButton);
  }, []);

  //update the size of the logo when the size of the screen changes
  const updateWidth = () => {
    const newWidth = window.innerWidth;
    setWidth(newWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    updateWidth();
  }, []);

  return (
    <>
      <div
        className="py-4 flex max-w-sm w-1/3 h-full justify-center items-center relative"
        style={{ display: showButton ? "none" : "flex" }}
      >
        <Link href="/">
          <Image
            src={logo.sourceUrl}
            alt={logo.title}
            width={width < 1024 ? "500" : "300"}
            height={width < 1024 ? "500" : "300"}
            className="relative"
          />
        </Link>
      </div>
      <div
        className="py-4 flex max-w-sm w-1/3 h-full justify-center items-center relative "
        style={{
          display: showButton ? "flex" : "none",
        }}
      >
        <ButtonLink
          destination={callToActionDestination}
          label={callToActionLabel}
          className="relative"
          btnClass="btnMedia"
        />
      </div>
    </>
  );
};
