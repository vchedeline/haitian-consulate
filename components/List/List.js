import React from "react";

export const List = ({ listItems }) => {
  const listElements = [];

  const getContent = (item) => {
    const htmlElement = item;
    listElements.push({ __html: htmlElement });
  };

  const getNestedList = (item) => {
    const nestedList = [];

    item.forEach((inner) => {
      inner.innerBlocks.forEach((i) => {
        const htmlElement = i.originalContent;
        nestedList.push(htmlElement);
      });
    });
    return nestedList.join("");
  };

  listItems.forEach((item) => {
    getContent(item.originalContent);
    if (Object.keys(item.innerBlocks).length !== 0) {
      const nestedListString =
        "<ul className='list-item list-disc list-inside '>" +
        getNestedList(item.innerBlocks) +
        "</ul>";
      getContent(nestedListString);
    }
  });

  return (
    <ul className="max-w-5xl mx-auto list-item list-disc list-inside">
      {listElements.map((elem, idx) => (
        <div key={idx} dangerouslySetInnerHTML={elem} />
      ))}
    </ul>
  );

  // const ulTag = React.createElement("ul", {
  //   dangerouslySetInnerHTML: { __html: listElements.join("") },
  //   className: "max-w-5xl mx-auto list-item list-disc list-inside",
  // });

  // return ulTag;
};
