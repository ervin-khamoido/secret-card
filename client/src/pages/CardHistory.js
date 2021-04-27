import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import {Loader} from '../components/Loader';
import { CardsList } from "../components/CardsList";

export const CardHistory = () => {
   const [cards, setCards] = useState([]);
   const {loading, request} = useHttp();
   const {token} = useContext(AuthContext);

   const fetchCards = useCallback(async () => {
      try {
         const fetched = await request('/api/history', 'GET', null, {
            Authorization: `Bearer ${token}`
         });
         
         setCards(fetched)
      } catch (error) {}
   }, [token, request])

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