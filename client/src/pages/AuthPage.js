import {useContext, useEffect, useState} from 'react';
import M from 'materialize-css';
import { useHttp } from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';
import { AuthContext } from '../context/AuthContext';

export const AuthPage = () => {
   const auth = useContext(AuthContext);
   const [form, setForm] = useState({
      email: '', password: ''
   });
   const {loading, error, request, clearError} = useHttp();
   const message = useMessage();

   useEffect(() => {
      M.AutoInit();
      window.M.updateTextFields();
      M.Tabs.init(document.querySelectorAll('.tabs'));
   }, [])

   useEffect(() => {
      message(error);
      clearError();
   }, [error, message, clearError]);

   const changeHandler = event => {
      setForm({...form, [event.target.name]: event.target.value})
   };

   const registerHandler = async () => {
      try {
         const data = await request('/api/auth/register', 'POST', {...form});
         message(data.message);
      } catch (error) {}
   };

   const loginHandler = async () => {
      try {
         const data = await request('/api/auth/login', 'POST', {...form});
         auth.login(data.token, data.userId);
      } catch (error) {}
   };

   return (
      <div className="row">
         <div className="col s12">
            <ul className="tabs">
               <li className="tab col s3"><a className="active" href="#login">LogIn</a></li>
               <li className="tab col s3"><a href="#signup">signUp</a></li>
            </ul>
         </div>
         <div id="login" className="col s12">
            <div className="row">
               <div className="col s6 offset-s3">
                  <h1>Secret card</h1>

                  <div className="card cyan darken-2">
                     <div className="card-content white-text">
                        <span className="auth-title card-title">Authorization</span>

                        <div>
                           <div className="input-field">
                              <input 
                                 type="text"
                                 name="email"
                                 placeholder="Enter an email"
                                 className="validate"
                                 required
                                 onChange={changeHandler}
                              />
                           </div>

                           <div className="input-field">
                              <input 
                                 type="password"
                                 name="password"
                                 className="validate"
                                 placeholder="Enter a password"
                                 required
                                 onChange={changeHandler}
                              />
                           </div>
                        </div>
                     </div>

                     <div className="card-action">
                        <button
                           type="submit"
                           className="auth-page-btn btn yellow darken-4"
                           disabled={loading}
                           onClick={loginHandler}
                        >
                           LogIn
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div id="signup" className="col s12">
            <div className="row">
               <div className="col s6 offset-s3">
                  <h1>Secret card</h1>

                  <div className="card cyan darken-2">
                     <div className="card-content white-text">
                        <span className="auth-title card-title">Authorization</span>

                        <div>
                           <div className="input-field">
                              <input 
                                 type="text"
                                 name="name"
                                 placeholder="Enter your name"
                                 className="validate"
                                 required
                                 onChange={changeHandler}
                              />
                           </div>
                           <div className="input-field">
                              <input 
                                 type="email"
                                 name="email"
                                 placeholder="Enter an email"
                                 className="validate"
                                 required
                                 onChange={changeHandler}
                              />
                           </div>

                           <div className="input-field">
                              <input 
                                 type="password"
                                 name="password"
                                 className="validate"
                                 placeholder="Enter a password"
                                 required
                                 onChange={changeHandler}
                              />
                           </div>
                        </div>
                     </div>

                     <div className="card-action">
                        <button
                           type="submit"
                           className="auth-page-btn btn yellow darken-4"
                           onClick={registerHandler}
                           disabled={loading}
                        >
                           SignUp
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}