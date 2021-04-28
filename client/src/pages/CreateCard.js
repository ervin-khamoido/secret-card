import { useContext, useEffect, useState } from "react";
// import { useHistory } from "react-router";
// import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";
// import '../scripts/removeValidation';

// import {findChildNodes} from '../scripts/removeValidation';

// function findChildNodes(elems) {
//    if (typeof elems === 'object') {
//       const keys = Object.keys(elems);
//       keys.forEach(item => {
//          if (elems[item].childNodes && elems[item].nodeType === 1) {
//             if (elems[item].classList.contains('active') || elems[item].classList.contains('valid') || elems[item].classList.contains('character-counter')) {
//                console.log('HAS CLASS', elems[item]);
//             }
//             // console.log('elem of obj has children', elems[item].childNodes);
//             findChildNodes(elems[item].childNodes);
//          } 
//          // else {
//          //    console.log('не имеет детей 0', elems[item]);
//          // }
//       })
//    }
// }

const owner = JSON.parse(localStorage.getItem('userData'));
// const createCardForm = document.querySelector('.card');
const initalState = {
   title: '',
   message: '',
   author: '',
   timeBeforeRemove: '',
   isForOneReader: true,
   password: '',
   owner: owner.userId
};

export const CreateCard = () => {
   useEffect(() => {
      const titleWithCounter = document.querySelector('#card_title');
      const textareaWithCounter = document.querySelector('#card_message');
      const authorWithCounter = document.querySelector('#card_author');
      
      window.M.CharacterCounter.init(titleWithCounter);
      window.M.CharacterCounter.init(textareaWithCounter);
      window.M.CharacterCounter.init(authorWithCounter);
   }, [])

   const {request} = useHttp();
   const message = useMessage();
   // const {logout} = useContext(AuthContext);
   // const history = useHistory();

   const [form, setForm] = useState({...initalState});

   // useEffect(() => {
   //    findChildNodes(createCardForm);
   // }, [form, setForm])

   const changeHandler = event => {
      if (event.target.name === 'isForOneReader') {
         setForm({...form, isForOneReader: !form.isForOneReader, timeBeforeRemove: ''});
         return
      }

      setForm({
         ...form,
         [event.target.name]: event.target.value
      });
   };

   const createCardHandler = async () => {
      try {
         const data = await request('/api/create', 'POST', {...form});
         console.log(data, 'data');
         console.log(data.status, 'data status');
         if (data.status === 201) {
            setForm({...initalState});
         }

         // if (data === 401) {
         //    // logout();
         //    // history.push('/');
         //    console.log('401 syk');
         // }

         message(data.message);
      } catch (error) {
         message('Invalid value!');
      }
   }

   // const clearHandler = () => {
   //    setForm({...initalState});
      
   //    console.log('form', form);
   //    console.log('initalState', initalState);
   //    console.log('form', form);
   // }

   return (
      <>
         <h1 style={{textAlign: 'center'}}>Create a card</h1>

         <div className="row">
            <div className="col s12 m10 offset-m1">
               <div className="card z-depth-2">
                  <div className="card-content" style={{paddingBottom: '100px'}}>
                     <div className="input-field col s12">
                        <input 
                           id="card_title"
                           name="title"
                           type="text"
                           value={form.title}
                           className="validate"
                           data-length="150"
                           onChange={changeHandler}
                        />
                        <label htmlFor="card_title">Title</label>
                     </div>

                     <div className="input-field col s12">
                        <textarea 
                           id="card_message"
                           name="message"
                           value={form.message}
                           className="materialize-textarea validate"
                           data-length="2500"
                           onChange={changeHandler}
                        ></textarea>
                        <label htmlFor="card_message">Message</label>
                     </div>

                     <div className="input-field col s12">
                        <input
                           id="card_author"
                           name="author"
                           type="text"
                           value={form.author}
                           className="validate"
                           data-length="50"
                           onChange={changeHandler}
                        />
                        <label htmlFor="card_author">Author</label>
                     </div>

                     <div className="input-field col s12">
                        <input
                           id="card_password"
                           name="password"
                           type="password"
                           value={form.password}
                           className="validate"
                           onChange={changeHandler}
                        />
                        <label htmlFor="card_password">Password</label>
                     </div>

                     <p>
                        <label>
                           <input
                              name="isForOneReader"
                              type="radio"
                              defaultChecked={form.isForOneReader}
                              onClick={changeHandler}
                           />
                           <span>For one reader</span>
                        </label>
                     </p>
                     <p>
                        <label>
                           <input
                              name="isForOneReader"
                              type="radio"
                              defaultChecked={!form.isForOneReader}
                              onClick={changeHandler}
                           />
                           <span>For many readers</span>
                        </label>
                     </p>

                     <div className="input-field col s12">
                        <input id="card_time_to_fade" type="number" className="validate" name="timeBeforeRemove" value={form.timeBeforeRemove} disabled={form.isForOneReader} onChange={changeHandler}/>
                        <label htmlFor="card_time_to_fade">Time to fade after reading first reader in <strong>minutes</strong></label>
                     </div>
                  </div>

                  <div className="card-action" style={{display:"flex", justifyContent: 'space-between'}}>
                     <button
                        type="submit"
                        className="btn cyan darken-2"
                        onClick={createCardHandler}
                     >
                        Create
                     </button>

                     {/* <button
                        className="btn red darken-4"
                        onClick={clearHandler}
                     >
                        Clear
                     </button> */}
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}