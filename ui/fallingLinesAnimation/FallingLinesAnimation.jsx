import { ThreeDots } from "react-loader-spinner";

const FallingLinesAnimation = ({ clss = "h-full", color = "084277" }) => {
  return (
    <div className={`w-full ${clss} flex items-center justify-center`}>
      {/* <FallingLines
        color="#084277"
        width="100"
        visible={true}
        ariaLabel="falling-lines-loading"
      /> */}
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color={`#${color}`}
        ariaLabel="three-dots-loading"
        visible={true}
      />
    </div>
  );
};

export default FallingLinesAnimation;
