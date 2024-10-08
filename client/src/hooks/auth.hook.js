import {useState, useCallback, useEffect} from 'react';

export const useAuth = () => {
   const [token, setToken] = useState(null);
   const [userId, setUserId] = useState(null);
   const [ready, setReady] = useState(null);
   
   const storageName = 'userData';

   const login = useCallback((jwtToken, id) => {
      setToken(jwtToken);
      setUserId(id);

      localStorage.setItem(storageName, JSON.stringify({
         userId: id,
         token: jwtToken
      }));
   }, []);

   const logout = useCallback((jwtToken, id) => {
      setToken(null);
      setUserId(null);

      localStorage.removeItem(storageName);
   }, []);

   useEffect(() => {
      const data = JSON.parse(localStorage.getItem(storageName));

      if (data && data.token) {
         login(data.token, data.userId)
      }

      setReady(true);
   }, [login])

   return {login, logout, token, userId, ready};
}