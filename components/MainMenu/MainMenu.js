import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { NavBar } from "components/NavBar";
import { SideBar } from "components/SideBar";

export const MainMenu = ({ props }) => {
  const { isFallback, events } = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  // Toggle side bar
  const toggle = () => {
    setIsOpen(!isOpen);
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
        document.body.append(s);
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
      <SideBar
        items={props.mainMenuItems}
        callToActionDestination={props.callToActionDestination}
        callToActionLabel={props.callToActionLabel}
        logo={props.logo}
        isOpen={isOpen}
        toggle={toggle}
      />
      <NavBar
        items={props.mainMenuItems}
        callToActionDestination={props.callToActionDestination}
        callToActionLabel={props.callToActionLabel}
        logo={props.logo}
        toggle={toggle}
      />
    </>
  );
};
