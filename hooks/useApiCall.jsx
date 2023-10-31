import axios from "axios";
import { useState } from "react";

const useApiCall = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // API fetching function
  const fetchData = async (config) => {
    setIsLoading(true);
    try {
      const { data } = await axios(config);

      setData(data?.data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, fetchData };
};

export default useApiCall;
