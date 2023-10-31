"use client";

import useApiCall from "@/hooks/useApiCall";
import { createContext, useEffect } from "react";

// Create Home context
export const CountryContext = createContext();

export const CountryProvider = ({ children }) => {
  const { error, isLoading, data: countryData, fetchData } = useApiCall();

  useEffect(() => {
    fetchData({
      method: "GET",
      url: `${process.env.NEXT_PUBLIC_URL}/country_list`,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CountryContext.Provider value={{ error, isLoading, countryData }}>
      {children}
    </CountryContext.Provider>
  );
};
