import { useEffect, useState } from "react";
import { SelectPicker } from "rsuite";
import { getCookie, hasCookie, setCookie } from "cookies-next";

export const GoogleTanslate = () => {
  const languages = [
    { label: "English", value: "/auto/en" },
    { label: `Haitian Creole`, value: "/auto/ht" },
    { label: "French", value: "/auto/fr" },
  ];

  const [selected, setSelected] = useState(null);

  useEffect(() => {
    var addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;

    if (hasCookie("googtrans")) {
      setSelected(getCookie("googtrans"));
    } else {
      setSelected("/auto/en");
    }
  }, []);

  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "auto",
        autoDisplay: false,
        includedLanguages: "fr,en,ht", // If you remove it, by default all google supported language will be included
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
      },
      "google_translate_element"
    );
  };

  const langChange = (e, m, evt) => {
    evt.preventDefault();
    if (hasCookie("googtrans")) {
      setCookie("googtrans", decodeURI(e));
      setSelected(e);
    } else {
      setCookie("googtrans", e);
      setSelected(e);
    }
    window.location.reload();
  };

  return (
    <>
      <div id="google_translate_element"></div>
      <SelectPicker
        data={languages}
        placement="bottomEnd"
        cleanable={false}
        value={selected}
        searchable={false}
        className={"notranslate"}
        menuClassName={"notranslate"}
        onSelect={(e, m, evt) => langChange(e, m, evt)}
        placeholder="Lang"
      />
    </>
  );
};
