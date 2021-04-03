import {Switch, Route, Redirect} from 'react-router-dom';
import {AuthPage} from './pages/AuthPage';
import { CardDetail } from './pages/CardDetail';
import { CardHistory } from './pages/CardHistory';
import { CreateCard } from './pages/CreateCard';
import { FindCard } from './pages/FindCard';

export const useRoutes = isAutenticated => {
   if (isAutenticated) {
      return (
         <Switch>
            <Route path="/create" exact component={CreateCard} />
            <Route path="/history" exact component={CardHistory} />
            <Route path="/find" exact component={FindCard} />
            <Route path="/detail/:id" exact component={CardDetail} />
            <Redirect to="/find" />
         </Switch>
      )
   } else {
      return (
         <Switch>
            <Route path="/" exact component={AuthPage} />
            <Redirect to="/" />
         </Switch>
      )
   }
}