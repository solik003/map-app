import { useState } from "react";


const link = 'https://app-map-a8ee6-default-rtdb.firebaseio.com'

export const useFirebaseAddRecord = (token: string | null) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addRecord = async (path: string, record: object) => {
    setLoading(true);
    setError(null);

    if (!token) {
      setError("Authentication token is required");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${link}/${path}.json?auth=${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(record),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error.message || "Failed to add record");
      }

      const data = await response.json();
    
      return data; 
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { addRecord, loading, error };
};

