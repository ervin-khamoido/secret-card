import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import {Loader} from '../components/Loader';
import { CardsList } from "../components/CardsList";
import { useHistory } from "react-router";

export const CardHistory = () => {
   const [cards, setCards] = useState([]);
   const {loading, request} = useHttp();
   const {token, logout} = useContext(AuthContext);
   const history = useHistory();

   const fetchCards = useCallback(async () => {
      try {
         const fetched = await request('/api/history', 'GET', null, {
            Authorization: `Bearer ${token}`
         });

         if (fetched === 401) {
            logout();
            history.push('/');
         }

         if (fetched === 500) {
            console.log('500 status code');
         }
         
         setCards(fetched);
      } catch (error) {}
   }, [token, request, history, logout])

   useEffect(() => {
      fetchCards();
   }, [fetchCards])

   if (loading) {
      return <Loader />
   }

   return (
      <>
         <h1 style={{textAlign: 'center'}}>History of created cards</h1>
         {!loading && <CardsList cards={cards} />}
      </>
   )
}