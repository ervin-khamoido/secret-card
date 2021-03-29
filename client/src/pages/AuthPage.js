export const AuthPage = () => {
   return (
      <div className="row">
         <div className="col s6 offset-s3">
            <h1>Secret card</h1>

            <div className="card cyan darken-2">
               <div className="card-content white-text">
                  <span className="auth-title card-title">Authorization</span>

                  <div>
                     <div className="input-field">
                        <input 
                           type="email"
                           id="email"
                           name="email"
                           placeholder="Enter an email"
                           className="validate"
                           required
                        />
                     </div>

                     <div className="input-field">
                        <input 
                           type="password"
                           name="password"
                           id="password"
                           className="validate"
                           placeholder="Enter a password"
                           required
                        />
                     </div>
                  </div>
               </div>

               <div className="card-action">
                  <button
                     className="auth-page-btn btn yellow darken-4"
                  >
                     LogIn
                  </button>
                  <button
                     className="auth-page-btn btn yellow darken-4"
                  >
                     SignUp
                  </button>
               </div>
            </div>
         </div>
      </div>
   )
}