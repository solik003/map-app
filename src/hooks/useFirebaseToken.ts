import { useEffect, useState } from "react";

interface FirebaseAuthResponse {
  idToken: string; 
  refreshToken: string;
  expiresIn: string;
  localId: string; 
}
const YOUR_FIREBASE_API_KEY = 'AIzaSyDPZMVaNERfRigtrLmDww6AqCxR-1nCRbY';

const useFirebaseToken = () => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const authenticateUser = async (email: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${YOUR_FIREBASE_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error.message);
      }

      const data: FirebaseAuthResponse = await response.json();
      setToken(data.idToken);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    authenticateUser('test@gmail.com', '123456789')
  }, [])

  return { token, loading, error };
};

export default useFirebaseToken;
