"use client";

import MyAccountMain from "@/components/myAccount/MyAccountMain";
import { HomeContext } from "@/context/homeContext";
import Preloader from "@/ui/preloader/Preloader";
import { useContext } from "react";

export default function MyAccount() {
  const { isLoading } = useContext(HomeContext);

  return isLoading ? <Preloader /> : <MyAccountMain />;
}
