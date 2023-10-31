import BannerSection from "@/components/common/BannerSection";
import ContactInfo from "@/components/contactUs/ContactInfo";
import ContactList from "@/components/contactUs/ContactList";
import Map from "@/components/contactUs/Map";

export default function ContactUs() {
  return (
    <>
      <BannerSection title="Contact us" />
      <ContactList />
      <ContactInfo />
      <Map />
    </>
  );
}
