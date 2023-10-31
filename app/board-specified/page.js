"use client";

import BoardSpecifiedMain from "@/components/boardSpecified/BoardSpecifiedMain";
import { HomeContext } from "@/context/homeContext";
import Preloader from "@/ui/preloader/Preloader";
import { useContext } from "react";

export default function BoardSpecified() {
  const { error, isLoading, data } = useContext(HomeContext);

  return isLoading ? <Preloader /> : <BoardSpecifiedMain />;
}
