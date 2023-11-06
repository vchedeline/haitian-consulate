export const FooterHeader = (image) => {
  const img = Object.values(image)[0];
  return (
    <div
      className="footheader"
      style={{ backgroundImage: `url(${img})` }}
    ></div>
  );
};
