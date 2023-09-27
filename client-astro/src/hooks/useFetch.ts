import React, { useEffect } from "react";

export default function useFetch(url: RequestInfo | URL, init?: RequestInit) {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [data, setData] = React.useState(null);

  useEffect(() => {
    fetch(url, init)
      .then((response) => {
        if (response.ok) return response.json();
        throw response;
      })
      .then((data) => setData(data))
      .catch((error) => {
        console.error("error fetching data", error);
        setError(error);
      })
      .finally(() => setLoading(false));
  }, []);

  return { loading, error, data };
}
