import { useState, useEffect } from 'react';

export function useJikan(endpoint, delay = 0, page = 1) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!endpoint) return;
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        if (delay > 0) {
          await new Promise((resolve) => setTimeout(resolve, delay));
        }

        if (!isMounted) return;

        const res = await fetch(`/api/jikan${endpoint}?&page=${page}`);

        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }

        const json = await res.json();

        if (isMounted) {
          if (Array.isArray(json)) {
            setData(json);
          } else {
            setData([]);
          }
        }
      } catch (err) {
        if (isMounted) {
          console.error(`Hook Fetch Error (${endpoint}):`, err);
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [endpoint, delay, page]);

  return { data, loading, error };
}
//  const fetchWithRetry = async (url, retries = 3, delay = 1000) => {
  //   for (let i = 0; i < retries; i++) {
  //     try {
  //       const res = await fetch(url);
  //       if (!res.ok) throw new Error(`HTTP ${res.status}`);
  //       return await res.json();
  //     } catch (err) {
  //       console.warn(`Fetch failed (attempt ${i + 1}/${retries}): ${err.message}`);
  //       if (i < retries - 1) {
  //         await new Promise((r) => setTimeout(r, delay));  
  //       } else {
  //         throw err;  
  //       }
  //     }
  //   }
  // };