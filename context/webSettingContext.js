"use client";

import useApiCall from "@/hooks/useApiCall";
import { createContext, useEffect } from "react";

// Create Home context
export const WebSettingContext = createContext();

export const WebSettingProvider = ({ children }) => {
  const { error, isLoading, data, fetchData } = useApiCall();

  useEffect(() => {
    fetchData({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_URL}/webSettings`,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <WebSettingContext.Provider value={{ error, isLoading, data }}>
      {children}
    </WebSettingContext.Provider>
  );
};
