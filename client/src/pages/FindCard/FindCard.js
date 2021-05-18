import { useState } from "react"
import { useHttp } from "../../hooks/http.hook";
import {Loader} from '../../components/Loader';
import { useModal } from "../../hooks/modals.hook";
import classes from './FindCard.module.scss';

export const FindCard = () => {
   const [cardId, setCardId] = useState('');
   const {loading, request} = useHttp();
   const [cardContent, setCardContent] = useState({
      title: '',
      message: '',
      author: '',
      disappearance: '',
      creation: '',
      errorMessage: ''
   });

   const modal = useModal();

   const titleWrapperStyles = [classes.TitleWrapper, 'title-wrapper'].join(' ');
   const authorStyles = [classes.Author, 'card-title'].join(' ');
   const findBtnStyles = [classes.FindBtn, "btn waves-effect cyan darken-2 modal-trigger"].join(' ');

   const titleError = ['card-title', classes.TitleError].join(' ');

   const changeHandler = event => {
      setCardId(event.target.value);
   }

   const findHandler = async event => {
      event.preventDefault();
      
      if (loading) {
         return <Loader />
      }

      try {
         console.log('cardId', cardId);
         const card = await request('/api/search', 'POST', {cardId});
         const cardInfo = card.potentialCard;
         console.log('card', card);

         if (card) {
            setCardContent({
               ...cardContent,
               title: cardInfo.title,
               message: cardInfo.message,
               author: cardInfo.author,
               disappearance: cardInfo.timeBeforeRemove,
               creation: cardInfo.dateOfCreation
            })

            modal('#card-modal').open();
            setCardId('');
         }
      } catch (error) {
         setCardContent({
            ...cardContent,
            errorMessage: error.toString()
         });
         console.log('fail', error.toString());
         modal('#card-modal').close();
         modal('#card-modal-error').open();
         setCardId('');
      }
   }

   return (
      <>
         <h1>Find card</h1>

         <div className="row">
            <form className="col s12">
               <div className="search-row row">
                  <div className="input-field col s11">
                     <input 
                        name="cardId"
                        type="text"
                        value={cardId}
                        onChange={changeHandler}
                        required
                     />
                     <label htmlFor="input_text">Enter card ID</label>
                  </div>
                  <button 
                     data-target="card-modal" 
                     className={findBtnStyles}
                     type="submit"
                     onClick={findHandler}
                  >
                     
                     <span>Find</span>
                     <i className="material-icons right">search</i>
                  </button>
               </div>
            </form>
         </div>

         <div className="modal card blue-grey darken-1" id="card-modal">
               <div className="card-content white-text">
                  <div className={titleWrapperStyles}>
                     <span className="card-title">{cardContent.title}</span>
                     <div>
                        <h6>Date of creation: {cardContent.creation}</h6>
                        <h6>Time until the card disappears: {cardContent.disappearance}</h6>
                     </div>
                  </div>
                  <hr/>
                  <p className={classes.Message}>{cardContent.message}</p>
               </div>
               <div className="card-action">
                  <button
                     className="modal-close btn waves-effect red darken-4 modal-trigger"
                  >
                     Close forever for you
                  </button>

                  <span className={authorStyles}>Author: {cardContent.author}</span>
               </div>
         </div>

         <div className="modal card blue-grey darken-1" id="card-modal-error">
               <div className="card-content white-text">
                  <div className={titleWrapperStyles}>
                     <span className={titleError}>Try again...</span>
                  </div>
                  <hr/>
                  <p className={classes.MessageError}>{cardContent.errorMessage}</p>
               </div>
               <div className="card-action">
                  <button
                     className="modal-close btn waves-effect red darken-4 modal-trigger"
                  >
                     Close
                  </button>
               </div>
         </div>
      </>
   )
}