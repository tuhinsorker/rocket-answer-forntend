import { ThreeDots } from "react-loader-spinner";

const ConversationLoad = () => {
  return (
    <ThreeDots
      height="30"
      width="30"
      color="#084277"
      ariaLabel="three-dots-loading"
      visible={true}
    />
  );
};

export default ConversationLoad;
