import { Record } from 'immutable';
import firebase from 'firebase';
import { ApolloError } from 'apollo-client';

export interface DeckErrorInterface {
  createDeckError: ApolloError | null;
  fetchDeckCardsError: ApolloError | null;
  plusDeckCardError: ApolloError | null;
  minusDeckCardError: ApolloError | null;
}

export default class DeckError extends Record<DeckErrorInterface>(
  {
    createDeckError: null,
    fetchDeckCardsError: null,
    plusDeckCardError: null,
    minusDeckCardError: null,
  },
  'DECK_ERROR'
) {
  setCreateDeckError(error: ApolloError | null): DeckError {
    return this.set('createDeckError', error);
  }
  setFetchDeckCardsError(error: ApolloError | null): DeckError {
    return this.set('fetchDeckCardsError', error);
  }
  setPlusDeckCardError(error: ApolloError | null): DeckError {
    return this.set('plusDeckCardError', error);
  }
  setMinusDeckCardError(error: ApolloError | null): DeckError {
    return this.set('minusDeckCardError', error);
  }
}
