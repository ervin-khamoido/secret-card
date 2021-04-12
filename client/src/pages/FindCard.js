import { useState } from "react"
import { useHttp } from "../hooks/http.hook";
import {Loader} from '../components/Loader';
import { useModal } from "../hooks/modals.hook";

export const FindCard = () => {
   const [value, setValue] = useState('');
   const {loading, request} = useHttp();
   const modal = useModal();

   const changeHandler = event => {
      setValue(event.target.value);
   }

   const findHandler = async event => {
      event.preventDefault();
      
      if (loading) {
         return <Loader />
      }
      try {
         // const card = await request('/api/search', 'POST', value);
         
         // if (card) {
         //    modal('#card-modal').open();
         // }
         
         modal('#card-modal').open();
      } catch (error) {}
   }

   return (
      <>
         <h1>Find card</h1>

         <div className="row">
            <form className="col s12">
               <div className="search-row row">
                  <div className="input-field col s11">
                     <input 
                        name="card_id"
                        type="text"
                        value={value}
                        onChange={changeHandler}
                        required
                     />
                     <label htmlFor="input_text">Enter card ID</label>
                  </div>
                  <button 
                     data-target="modal1" 
                     className="btn waves-effect cyan darken-2 modal-trigger"
                     type="submit"
                     onClick={findHandler}
                  >
                     <i className="material-icons right">search</i>
                     Find
                  </button>
               </div>
            </form>
         </div>

         <div className="modal card blue-grey darken-1" id="card-modal">
               <div className="card-content white-text">
                  <div className="title-wrapper" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                     <span className="card-title">Card Title</span>
                     <div>
                        <h6>Date of creation: 06/02/2021</h6>
                        <h6>Time until the card disappears: 00:12:43</h6>
                     </div>
                  </div>
                  <hr/>
                  <p style={{marginTop: '20px'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos voluptatum deserunt eos fuga esse quisquam, in nemo ut odio quis placeat consequatur maiores, reiciendis debitis, id aliquid nihil quo. Exercitationem veritatis laudantium saepe iure unde nemo facilis quia sint nihil! lorem100</p>
               </div>
               <div className="card-action">
                  <button
                     className="modal-close btn waves-effect red darken-4 modal-trigger"
                  >
                     Close forever for you
                  </button>

                  <span className="card-title" style={{position: "absolute", right: '23px'}}>Author: Ervin</span>
               </div>
         </div>
      </>
   )
}