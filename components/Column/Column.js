export const Column = ({
  children,
  width,
  textColor,
  backgroundColor,
  blockClass,
}) => {
  const textColorStyle = textColor ? { color: textColor } : {};
  const backgroundColorStyle = backgroundColor ? { backgroundColor } : {};
  const widthStyle = width
    ? { minWidth: width, flexGrow: 1 }
    : { flexGrow: 1, flexBasis: 0 };

  const blockClassName = blockClass || "footCol";
  const hasClassAttribute = () => {
    return (
      <div
        style={{ ...widthStyle, ...textColorStyle, ...backgroundColorStyle }}
        className={`${blockClassName}`}
      >
        {children}
      </div>
    );
  };
  const noClassAttribute = () => {
    return (
      <div
        style={{ ...widthStyle, ...textColorStyle, ...backgroundColorStyle }}
        className="px-2 py-2 flex flex-col place-content-center"
      >
        {children}
      </div>
    );
  };

  return blockClass ? hasClassAttribute() : noClassAttribute();
};
