import { useCallback, useState } from "react"

export const useHttp = () => {
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);

   const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
      setLoading(true);

      try {
         if (body) {
            body = JSON.stringify(body);
            headers['Content-Type'] = 'application/json';
         }

         const response = await fetch(url, {
            method,
            body,
            headers
         });

         console.log('response.status', response.status);

         if (response.status === 401 || response.status === 500) {
            return response.status
         }

         const data = await response.json();
         
         if (!response.ok) {
            throw new Error(data.message || 'Something went wrong!');
            // return response.status
         }

         setLoading(false);

         return data;
      } catch (error) {
         console.log(error);
         setLoading(false);
         setError(error.message);
         throw error;
      }
   }, []);

   const clearError = useCallback(() => setError(null), []);

   return {
      loading,
      request,
      error,
      clearError
   }
}