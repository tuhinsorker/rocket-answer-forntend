"use client";

import { usePathname } from "next/navigation";
import ExpertDashboardNavbar from "../navBar/ExpertDashboardNavbar";
import NavBar from "../navBar/NavBar";

const NavBarWrapper = () => {
  const pathName = usePathname();

  const includePath = pathName.includes("/expert/dashboard");

  return <>{includePath ? <ExpertDashboardNavbar /> : <NavBar />}</>;
};

export default NavBarWrapper;
