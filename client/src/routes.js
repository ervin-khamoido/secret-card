import {Switch, Route, Redirect} from 'react-router-dom';
import {AuthPage} from './pages/AuthPage';
import { CardHistory } from './pages/CardHistory';
import { CreateCard } from './pages/CreateCard';
import { FindCard } from './pages/FindCard/FindCard';

export const useRoutes = isAutenticated => {
   if (isAutenticated) {
      return (
         <Switch>
            <Route path="/create" exact component={CreateCard} />
            <Route path="/history" exact component={CardHistory} />
            <Route path="/search" exact component={FindCard} />
            <Redirect to="/search" />
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