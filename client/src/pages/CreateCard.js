import { useEffect } from "react"

export const CreateCard = () => {
   useEffect(() => {
      const titleWithCounter = document.querySelector('#card_title');
      const textareaWithCounter = document.querySelector('#card_main_text');
      const authorWithCounter = document.querySelector('#card_author');
      
      window.M.CharacterCounter.init(titleWithCounter);
      window.M.CharacterCounter.init(textareaWithCounter);
      window.M.CharacterCounter.init(authorWithCounter);
   }, [])

   return (
      <>
         <h1>Create a card</h1>

         <div className="row">
            <div className="col s12 m10 offset-m1">
               <div className="card z-depth-2">
                  <div className="card-content">
                     <div className="input-field col s12">
                        <input id="card_title" type="text" className="validate" data-length="150"/>
                        <label htmlFor="card_title">Card title</label>
                     </div>

                     <div className="input-field col s12">
                        <textarea id="card_main_text" className="materialize-textarea validate" data-length="2500"></textarea>
                        <label htmlFor="card_main_text">Message</label>
                     </div>

                     <div className="input-field col s12">
                        <input id="card_author" type="text" className="validate" data-length="50"/>
                        <label htmlFor="card_author">Author</label>
                     </div>

                     <div className="input-field col s12">
                        <input id="card_author" type="text" className="validate" data-length="50"/>
                        <label htmlFor="card_author">Time to fade after reading</label>
                     </div>

                     <p>I am a very simple card. I am good at containing small bits of information.
                     I am convenient because I require little markup to use effectively.</p>
                  </div>

                  <div className="card-action">
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}