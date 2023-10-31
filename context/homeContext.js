"use client";

import useApiCall from "@/hooks/useApiCall";
import { createContext, useEffect } from "react";

// Create Home context
export const HomeContext = createContext();

export const HomeProvider = ({ children }) => {
  const { error, isLoading, data, fetchData } = useApiCall();

  useEffect(() => {
    fetchData({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_URL}/customer/landingPage`,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <HomeContext.Provider value={{ error, isLoading, data }}>
      {children}
    </HomeContext.Provider>
  );
};
