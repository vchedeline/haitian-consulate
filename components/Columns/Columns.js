export const Columns = ({
  isStackedOnMobile,
  children,
  textColor,
  backgroundColor,
}) => {
  const textColorStyle = textColor ? { color: textColor } : {};
  const backgroundColorStyle = backgroundColor ? { backgroundColor } : {};

  return (
    <div style={{ ...textColorStyle, ...backgroundColorStyle }}>
      <div
        className={`max-w-7xl mx-auto my-5 ${
          isStackedOnMobile ? "block md:flex" : "flex"
        }`}
      >
        {children}
      </div>
    </div>
  );
};
