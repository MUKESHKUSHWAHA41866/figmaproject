import SimpleImageSlider from "react-simple-image-slider";

const images = [
  { url: "/slider1.png" },
  { url: "/slider2.webp" },
  { url: "/slider3.webp" },
];

const Slider = () => {
  return (
    <div>
      <SimpleImageSlider
        width={1500}
        height={300}
        images={images}
        showBullets={true}
        showNavs={true}
      />
    </div>
  );
}

export default Slider


