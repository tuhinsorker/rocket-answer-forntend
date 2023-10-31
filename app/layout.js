import Footer from "@/components/footer/Footer";
import { CountryProvider } from "@/context/countryInfoContext";
import { HomeProvider } from "@/context/homeContext";
import { WebSettingProvider } from "@/context/webSettingContext";

// slick css
import "slick-carousel/slick/slick.css";

// react-modal-video css
import "node_modules/react-modal-video/scss/modal-video.scss";

// toastify css
import "react-toastify/dist/ReactToastify.css";

// sweet alert
import "sweetalert2/src/sweetalert2.scss";

// main css
import NavBarWrapper from "@/components/common/NavBarWrapper";
import "../style/globals.css";

// const data = webSettings();
// data.then((data) => console.log("data", data));

export const metadata = {
  title: "Rocket",
  description: "Rocket",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="relative" suppressHydrationWarning={true}>
        <HomeProvider>
          <CountryProvider>
            <WebSettingProvider>
              <NavBarWrapper />

              {children}

              <Footer />
            </WebSettingProvider>
          </CountryProvider>
        </HomeProvider>
      </body>
    </html>
  );
}
