import { BsFillStarFill, BsStar, BsStarHalf } from "react-icons/bs";
import ReactStars from "react-rating-stars-component";

const ReactRating = ({ getRatingData }) => {
  const ratingChanged = (newRating) => {
    getRatingData(newRating);
  };

  return (
    <ReactStars
      count={5}
      onChange={ratingChanged}
      size={24}
      isHalf={true}
      emptyIcon={<BsStar />}
      halfIcon={<BsStarHalf />}
      filledIcon={<BsFillStarFill />}
      activeColor="#f06a3d"
    />
  );
};

export default ReactRating;
