"use client";

import BoardMain from "@/components/board/BoardMain";
import { HomeContext } from "@/context/homeContext";
import Preloader from "@/ui/preloader/Preloader";
import { useContext } from "react";

export default function Board() {
  const { isLoading } = useContext(HomeContext);

  return isLoading ? <Preloader /> : <BoardMain />;
}
