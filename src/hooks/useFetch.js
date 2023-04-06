import { useState, useCallback } from 'react';

function useFetch(initialValueData = null) {
  const [isLoading, setIsLoading] = useState(true);
  const [errors, setErrors] = useState({ erro: null });
  const [data, setData] = useState(initialValueData);

  const fetchData = useCallback(async (url) => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        const newError = await response.json();
        throw newError.message;
      }

      const json = await response.json();

      setData(json);
    } catch (e) {
      setErrors(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    errors,
    data,
    fetchData,
  };
}

export default useFetch;
