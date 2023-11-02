export const List = ({ listItems }) => {
  const listElements = [];

  listItems.forEach((item) => {
    const htmlElement = item.originalContent;
    listElements.push({ __html: htmlElement });
  });

  return (
    <div>
      <ul>
        {listElements.map((elem, idx) => (
          <div key={idx} dangerouslySetInnerHTML={elem} />
        ))}
      </ul>
    </div>
  );
};
