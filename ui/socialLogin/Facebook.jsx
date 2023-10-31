import ReactFacebookLogin from "react-facebook-login";

const Facebook = ({ appId }) => {
  const responseFacebook = (response) => {
    console.log(response);
  };

  return (
    <ReactFacebookLogin
      // appId="259791428784848"
      appId={appId}
      // autoLoad={true}
      fields="name,email,picture"
      callback={responseFacebook}
      // cssClass="w-[30px] h-[30px] flex items-center justify-center rounded-md border bg-blue-600 text-white hover:translate-y-[2px] hover:shadow-lg transition-all duration-500"
      cssClass="w-full h-[35px] sm:h-[45px] flex items-center justify-center rounded-md border bg-blue-600 text-white hover:translate-y-[2px] hover:shadow-lg transition-all duration-500"
      textButton="Facebook"
      // icon={<BsFacebook className="text-base" />}
    />
  );
};

export default Facebook;
