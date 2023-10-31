"use client";

import { WebSettingContext } from "@/context/webSettingContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useContext } from "react";
import Facebook from "./Facebook";
import Google from "./Google";

const SocialLogin = () => {
  const { error, isLoading, data } = useContext(WebSettingContext);

  return (
    !isLoading && (
      <>
        {/* google login */}
        {/* <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
        > */}
        <GoogleOAuthProvider clientId={data?.gl_login?.client_id}>
          <Google />
        </GoogleOAuthProvider>

        {/* facebook login */}
        <Facebook appId={data?.fb_login?.app_id} />
      </>
    )
  );
};

export default SocialLogin;
