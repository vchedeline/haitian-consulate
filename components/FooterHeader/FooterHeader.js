export const FooterHeader = (image) => {
  console.log("IMAGE FOOTER: ", image);
  const img = Object.values(image)[0];
  console.log("Img: ", img);
  return (
    <div
      className="footheader"
      style={{ backgroundImage: `url(${img})` }}
    ></div>
  );
};
