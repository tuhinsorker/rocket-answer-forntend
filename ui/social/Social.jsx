import Link from "next/link";
import { BsFacebook, BsGoogle, BsLinkedin, BsTwitter } from "react-icons/bs";

const Social = () => {
  return (
    <div className="flex items-center gap-2 mt-5">
      <Link
        href="#"
        className="w-[30px] h-[30px] flex items-center justify-center rounded-md border bg-[var(--secondary)] text-white"
      >
        <BsGoogle className="text-sm" />
      </Link>
      <Link
        href="#"
        className="w-[30px] h-[30px] flex items-center justify-center rounded-md border bg-blue-600 text-white"
      >
        <BsLinkedin className="text-sm" />
      </Link>
      <Link
        href="#"
        className="w-[30px] h-[30px] flex items-center justify-center rounded-md border bg-blue-600 text-white"
      >
        <BsFacebook className="text-sm" />
      </Link>
      <Link
        href="#"
        className="w-[30px] h-[30px] flex items-center justify-center rounded-md border bg-cyan-600 text-white"
      >
        <BsTwitter className="text-sm" />
      </Link>
    </div>
  );
};

export default Social;
