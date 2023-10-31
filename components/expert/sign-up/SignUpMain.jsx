import SocialLogin from "@/ui/socialLogin/SocialLogin";
import Image from "next/image";
import Link from "next/link";
import SignUpForm from "./SignUpForm";
import sign_up from "/public/images/sign_up.png";

const SignUpMain = () => {
  return (
    <section className="my-[40px] md:my-[60px] px-3 2xl:px-0">
      <div className="max-w-[1296px] mx-auto flex flex-col sm:flex-row items-center shadow-md border py-10 md:py-20 rounded">
        <div className="w-full sm:w-1/2 px-[10px] sm:px-5 md:px-10 lg:px-20">
          {/* logo here */}
          {/* <Image src={logo} alt="logo" /> */}

          <div className="mt-[15px] md:mt-5">
            <h3 className="text-xl md:text-3xl leading-6 md:leading-9 text-[var(--primary)] font-normal">
              Start your free account today.
            </h3>
            <p className="text-sm md:text-lg leading-5 md:leading-6 text-[var(--primary)] mt-1">
              To access Rocket Home
            </p>
          </div>

          {/* SignUp form  */}
          <SignUpForm />

          <div className="border-t mt-5">
            <h6 className="text-base leading-5 text-[var(--gray-2)] mt-[15px]">
              Sign in using
            </h6>

            {/* <div className="flex items-center gap-2 mt-5"> */}
            <div
              className="mt-3"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: "8px",
              }}
            >
              {/* Social Section Here */}
              <SocialLogin />
            </div>
          </div>
        </div>
        <div className="w-full sm:w-1/2 bottom-0 sm:border-l mt-10 md:mt-0">
          <div className="w-[300px] lg:w-[400px] mx-auto">
            {/* Sign in image */}
            <Image src={sign_up} alt="sign_up" />

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

      <div className="mt-5 text-center">
        <p className="text-sm sm:text-base leading-5 text-[var(--gray)]">
          Don&#39;t have a Rocket account?{" "}
          <Link
            href="/expert/sign-in"
            className="text-[var(--secondary)] hover:underline
            "
          >
            Login here
          </Link>
        </p>
      </div>
    </section>
  );
};

export default SignUpMain;
