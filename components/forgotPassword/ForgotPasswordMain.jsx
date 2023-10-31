import Image from "next/image";
import ForgotPasswordForm from "./ForgotPasswordForm";
import logo from "/public/images/logos/logo.png";
import sign_in from "/public/images/sign_in.png";

const ForgotPasswordMain = () => {
  return (
    <section className="my-[40px] md:my-[60px] px-3 2xl:px-0">
      <div className="max-w-[1296px] mx-auto flex flex-col sm:flex-row items-center shadow-md border py-10 md:py-20 rounded">
        <div className="w-full sm:w-1/2 px-[10px] sm:px-5 md:px-10 lg:px-[70px]">
          {/* logo here */}
          <Image src={logo} alt="logo" />

          <div className="mt-[15px] md:mt-5">
            <h3 className="text-xl md:text-3xl leading-6 md:leading-9 text-[var(--primary)] font-normal">
              Forgot Password
            </h3>
            <p className="text-sm md:text-lg leading-5 md:leading-6 text-[var(--primary)] mt-1">
              Enter your registered email address, mobile number, or username to
              change your Rocket Answer account password.
            </p>
          </div>

          {/* Forgot Password form  */}
          <ForgotPasswordForm />
        </div>

        <div className="w-full sm:w-1/2 bottom-0 sm:border-l mt-10 md:mt-0">
          <div className="w-[300px] lg:w-[400px] mx-auto">
            {/* Sign in image */}
            <Image src={sign_in} alt="sign_in" />

            <div className="text-center px-3 lg:px-10 mt-5 lg:mt-10">
              <h6 className="text-xl left-6 text-[var(--primary)] capitalize">
                KEEP YOUR ACCOUNT SECURE
              </h6>
              <p className="text-base leading-5 text-[var(--dark)] mt-[10px]">
                Rocket OneAuth is our new in-house multi-factor authentication
                app. Shield your Rocket account with OneAuth now.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPasswordMain;
