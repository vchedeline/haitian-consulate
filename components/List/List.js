import React from "react";

export const List = ({ listItems }) => {
  const listElements = [];

  listItems.forEach((item) => {
    const htmlElement = item.originalContent;
    listElements.push({ __html: htmlElement });
  });

  return (
    <>
      {listElements.map((elem, idx) => (
        <div
          className="max-w-5xl mx-auto"
          key={idx}
          dangerouslySetInnerHTML={elem}
        />
      ))}
    </>
  );
};
