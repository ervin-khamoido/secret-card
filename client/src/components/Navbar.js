// import {useContext} from 'react';
import { useContext } from 'react';
import {NavLink, useHistory} from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const Navbar = () => {
   const {logout} = useContext(AuthContext);
   const history = useHistory();

   const logoutHandler = event => {
      event.preventDefault();
      logout();
      history.push('/');
   }

   return (
      <nav>
         <div className="navbar nav-wrapper cyan darken-2">
            <a href="/" className="brand-logo">Secret Card</a>

            <ul id="nav-mobile" className="right hide-on-med-and-down">
               <li><NavLink to="/search">Find a card</NavLink></li>
               <li><NavLink to="/create">Create a card</NavLink></li>
               <li><NavLink to="/history">History of created cards</NavLink></li>
               <li><a href="/" onClick={logoutHandler}>Logout</a></li>
            </ul>
         </div>
      </nav>
   )
}