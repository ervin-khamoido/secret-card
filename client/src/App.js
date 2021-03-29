import 'materialize-css';
import {BrowserRouter} from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { useRoutes } from './routes';

function App() {
  const isAuthenticated = false;
  const routes = useRoutes(isAuthenticated);
  return (
    <BrowserRouter>
      {isAuthenticated && <Navbar/>}
      {/* <Navbar/> */}
      <div className="container">
        {routes}
      </div>
    </BrowserRouter>
  );
}

export default App;