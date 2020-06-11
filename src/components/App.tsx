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
import { ID_TOKEN } from '../constants/local-storage-keys';
import Lockr from 'lockr';
import { ApolloError } from 'apollo-client';
import Game from '../pages/Game';
import DeckModal from '../models/DeckModal';

export interface AppContextInterface {
  selectedDeckId: number | null;
  setSelectedDeckId: (value: number | null) => void;

  user: User;
  setUser: (value: User) => void;

  plusDeckCardError: ApolloError | null;
  setPlusDeckCardError: (value: ApolloError | null) => void;

  minusDeckCardError: ApolloError | null;
  setMinusDeckCardError: (value: ApolloError | null) => void;

  createDeckError: ApolloError | null;
  setCreateDeckError: (value: ApolloError | null) => void;

  deckModal: DeckModal;
  setDeckModal: (value: DeckModal) => void;
}

export const AppContext = createContext<AppContextInterface>({
  selectedDeckId: null,
  setSelectedDeckId: () => {},

  user: new User(),
  setUser: () => {},

  plusDeckCardError: null,
  setPlusDeckCardError: () => {},

  minusDeckCardError: null,
  setMinusDeckCardError: () => {},

  createDeckError: null,
  setCreateDeckError: () => {},

  deckModal: new DeckModal(),
  setDeckModal: () => {},
});

export default function App() {
  const [selectedDeckId, setSelectedDeckId] = useState<number | null>(null);
  const [user, setUser] = useState<User>(new User());
  const [
    plusDeckCardError,
    setPlusDeckCardError,
  ] = useState<ApolloError | null>(null);
  const [
    minusDeckCardError,
    setMinusDeckCardError,
  ] = useState<ApolloError | null>(null);
  const [createDeckError, setCreateDeckError] = useState<ApolloError | null>(
    null
  );
  const [deckModal, setDeckModal] = useState<DeckModal>(new DeckModal());

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
      value={{
        user,
        setUser,
        selectedDeckId,
        setSelectedDeckId,
        plusDeckCardError,
        setPlusDeckCardError,
        minusDeckCardError,
        setMinusDeckCardError,
        createDeckError,
        setCreateDeckError,
        deckModal,
        setDeckModal,
      }}
    >
      <Navbar />
      <Switch>
        <Route exact path="/" component={Index} />
        <PrivateRoute exact path="/deck" component={Deck} />
        <PrivateRoute exact path="/game" component={Game} />
        <Route exact path="/help" component={Help} />
        <Route exact path="/rule" component={Rule} />
        <Route component={NotFound} />
      </Switch>
    </AppContext.Provider>
  );
}
