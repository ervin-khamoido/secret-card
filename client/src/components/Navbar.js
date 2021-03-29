// import {useContext} from 'react';
import {NavLink} from 'react-router-dom';

export const Navbar = () => {
   // const history = useHistory();

   return (
      <nav>
         <div className="navbar nav-wrapper cyan darken-2">
            <a href="/" className="brand-logo">Secret Card</a>

            <ul id="nav-mobile" className="right hide-on-med-and-down">
               <li><NavLink to="/find">Find a card</NavLink></li>
               <li><NavLink to="/create">Create a card</NavLink></li>
               <li><NavLink to="/history">History of created cards</NavLink></li>
               <li><a href="/">Logout</a></li>
            </ul>
         </div>
      </nav>
   )
}