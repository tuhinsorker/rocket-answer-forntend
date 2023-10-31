import imgPath from "@/utils/imgPath";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const TeamCard = ({ data }) => {
  const { name, designation, profile, fb, twitter, linkedin } = data;

  return (
    <div className="w-[275px] md:w-[325px] pb-5 md:pb-7 border shadow-md rounded cursor-pointer box-hover">
      <div className="w-full">
        <Image
          src={imgPath(profile)}
          alt="team_avt"
          className="hover:scale-95 transition-all duration-500"
          width={330}
          height={300}
        />
      </div>
      <div className="text-center mt-4">
        <h4 className="text-xl md:text-2xl leading-6 md:leading-8 text-[var(--primary)] font-bold">
          {name}
        </h4>
        <h4 className="text-xl md:text-2xl leading-6 md:leading-8 text-[var(--primary)] mt-1">
          {designation}
        </h4>
      </div>
      <div className="mt-[10px] md:mt-4">
        <ul className="flex items-center justify-center gap-2">
          <li>
            <Link href={fb || "#"} className="icon-outline">
              <FaFacebookF />
            </Link>
          </li>
          <li>
            <Link href={twitter || "#"} className="icon-outline">
              <FaTwitter />
            </Link>
          </li>
          <li>
            <Link href={linkedin || "#"} className="icon-outline">
              <FaLinkedinIn />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TeamCard;
