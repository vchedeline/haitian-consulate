import Link from "next/link";
import { ButtonLink } from "components/ButtonLink";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export const MainMenu = ({
  items,
  callToActionLabel,
  callToActionDestination,
  logo,
}) => {
  const [scrollState, setScrollState] = useState(false);
  const { isFallback, events } = useRouter();

  // Scrolling event
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const handleScroll = () => {
    if (window.scrollY > 50) setScrollState(true);
    else setScrollState(false);
  };

  // Google Translate Script
  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      { pageLanguage: "auto", includedLanguages: "fr,en,ht" },
      "google_translate_element"
    );
  };

  useEffect(() => {
    const id = "google-translate-script";

    const addScript = () => {
      const s = document.createElement("script");
      s.setAttribute(
        "src",
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
      );
      s.setAttribute("id", id);
      const q = document.getElementById(id);
      if (!q) {
        document.body.appendChild(s);
        window.googleTranslateElementInit = googleTranslateElementInit;
      }
    };

    const removeScript = () => {
      const q = document.getElementById(id);
      if (q) q.remove();
      const w = document.getElementById("google_translate_element");
      if (w) w.innerHTML = "";
    };

    isFallback || addScript();

    events.on("routeChangeStart", removeScript);
    events.on("routeChangeComplete", addScript);

    return () => {
      events.off("routeChangeStart", removeScript);
      events.off("routeChangeComplete", addScript);
    };
  }, [isFallback, events]);

  return (
    <>
      <div id="google_translate_element"></div>
      <div className={scrollState ? "menu menuScrolled" : "menu"}>
        <div className="py-4 flex max-w-sm w-1/3 h-full justify-items-center bg-white/10 relative">
          <Link href="/">
            <Image
              src={logo.sourceUrl}
              alt={logo.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </Link>
        </div>
        <div className="flex flex-1 justify-end space-x-4 h-full">
          {(items || []).map((item) => (
            <div
              key={item.id}
              className="hover:bg-blue-950 cursor-pointer relative group my-0 place-self-center"
            >
              <div>
                <Link href={item.destination} className="p-6 block">
                  {item.label}
                </Link>
              </div>
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
            />
          </div>
        </div>
      </div>
    </>
  );
};
