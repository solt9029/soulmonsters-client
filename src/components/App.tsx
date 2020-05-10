import React, { useEffect, useState, createContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Help from '../pages/Help';
import Rule from '../pages/Rule';
import NotFound from '../pages/NotFound';
import Index from '../pages/Index';
import Deck from '../pages/Deck';
import PrivateRoute from './PrivateRoute';
import User from '../models/User';
import { auth } from 'firebase';
import { ID_TOKEN } from '../constants/local-storage';
import Lockr from 'lockr';

export interface AppContextInterface {
  selectedDeckId: string | null;
  setSelectedDeckId: (value: string | null) => void;
  user: User;
  setUser: (value: User) => void;
}

export const AppContext = createContext<AppContextInterface>({
  selectedDeckId: null,
  setSelectedDeckId: () => {},
  user: new User(),
  setUser: () => {},
});

export default function App() {
  const [selectedDeckId, setSelectedDeckId] = useState<string | null>(null);
  const [user, setUser] = useState<User>(new User());

  // componentDidMount
  useEffect(() => {
    auth().onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        setUser(user.doneLogin(firebaseUser));
        const idToken = await firebaseUser.getIdToken(true);
        Lockr.set(ID_TOKEN, idToken);
        return;
      }
      Lockr.rm(ID_TOKEN);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AppContext.Provider
      value={{ user, setUser, selectedDeckId, setSelectedDeckId }}
    >
      <Navbar />
      <Switch>
        <Route exact path="/" component={Index} />
        <PrivateRoute exact path="/deck" component={Deck} />
        <Route exact path="/help" component={Help} />
        <Route exact path="/rule" component={Rule} />
        <Route component={NotFound} />
      </Switch>
    </AppContext.Provider>
  );
}
