import { successAlert } from "@/utils/alerts";
import setDataToLocalStorage from "@/utils/setDataToLocalStorage";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const Google = () => {
  const router = useRouter();

  const fetchLogin = async (access_token) => {
    try {
      const res = await axios(
        `${process.env.NEXT_PUBLIC_BASE_URL}/checkGmailLogin?token=${access_token}`
      );

      if (res.status === 200) {
        /**
         * Store data in local storage.
         *
         * This function is responsible for storing data, such as user information or response data,
         * in the local storage of the application. It typically takes two parameters: `res`, which
         * represents the data to be stored, and `userType`, which may be used as a key or identifier
         * for retrieving the data later.
         *
         * @param {any} res - The data to be stored in local storage.
         * @param {string} userType - An optional user type or identifier for organizing the data.
         */
        setDataToLocalStorage(res, "customer");

        // set user type on cookies
        Cookies.set("userType", res.data.data.user_type, { expires: 1 });

        // set token to cookies
        Cookies.set("token", res.data.data.access_token, { expires: 1 });

        /**
         * Display a `successAlert` message.
         *
         * @param {string} title - The title of the success alert.
         * @param {string} text - The text to display in the success alert.
         */
        successAlert("Good job!", "Registration successful!");

        // redirect to home
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      const access_token = tokenResponse.access_token;

      // login to the user using google
      fetchLogin(access_token);
    },
  });

  return (
    <button
      type="button"
      // className="w-[30px] h-[30px] flex items-center justify-center rounded-md border bg-[var(--secondary)] text-white hover:translate-y-[2px] hover:shadow-lg transition-all duration-500"
      className="w-full h-[35px] sm:h-[45px] flex items-center justify-center rounded-md border bg-[var(--secondary)] text-white hover:translate-y-[2px] hover:shadow-lg transition-all duration-500"
      onClick={() => login()}
    >
      {/* <BsGoogle className="text-sm" /> */}
      Gmail
    </button>
  );
};

export default Google;
