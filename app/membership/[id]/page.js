"use client";

import MembershipPurchaseMain from "@/components/membership/MembershipPurchaseMain";
import { HomeContext } from "@/context/homeContext";
import Preloader from "@/ui/preloader/Preloader";
import { useContext } from "react";

export default function MembershipPurchase() {
  const { isLoading } = useContext(HomeContext);

  return isLoading ? <Preloader /> : <MembershipPurchaseMain />;
}
