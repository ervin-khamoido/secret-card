import 'materialize-css';
import {BrowserRouter} from 'react-router-dom';
import { Loader } from './components/Loader';
import { Navbar } from './components/Navbar';
import { AuthContext } from './context/AuthContext';
import { useAuth } from './hooks/auth.hook';
import { useRoutes } from './routes';

function App() {
  const {token, login, logout, userId, ready} = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  if (!ready) {
    return <Loader />
  }

  // const prod = () => {
  //   localStorage.setItem('')
  // }

  return (
    <div onClick={event => prod(event)}>
      <AuthContext.Provider value={{token, login, logout, userId, isAuthenticated}}>
        <BrowserRouter>
          {isAuthenticated && <Navbar/>}
          <div className="container">
            {routes}
          </div>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;