"use client";

import MembershipMain from "@/components/membership/MembershipMain";
import { HomeContext } from "@/context/homeContext";
import Preloader from "@/ui/preloader/Preloader";
import { useContext } from "react";

export default function Membership() {
  const { isLoading } = useContext(HomeContext);

  return isLoading ? <Preloader /> : <MembershipMain />;
}
