import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from '../containers/Navbar';
import Help from '../pages/Help';
import Rule from '../pages/Rule';
import NotFound from '../pages/NotFound';
import Index from '../pages/Index';
import Deck from '../pages/Deck';
import PrivateRoute from './PrivateRoute';
import { UserInterface } from '../models/User';
import { useDecksQuery } from '../graphql/generated/graphql-client';

interface Props {
  initializeUser: Function;
  user: UserInterface;
}

export default function App(props: Props) {
  // componentDidMount
  useEffect(() => {
    props.initializeUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const { data } = useDecksQuery({ pollInterval: 10000 });
  console.log(data);

  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Index} />
        <PrivateRoute exact path="/deck" user={props.user} component={Deck} />
        <Route exact path="/help" component={Help} />
        <Route exact path="/rule" component={Rule} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}
