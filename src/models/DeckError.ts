import { Record } from 'immutable';
import { ApolloError } from 'apollo-client';

export interface DeckErrorInterface {
  createDeckError: ApolloError | null;
  fetchDecksError: ApolloError | null;
  fetchDeckCardsError: ApolloError | null;
  plusDeckCardError: ApolloError | null;
  minusDeckCardError: ApolloError | null;
}

export default class DeckError extends Record<DeckErrorInterface>(
  {
    createDeckError: null,
    fetchDecksError: null,
    fetchDeckCardsError: null,
    plusDeckCardError: null,
    minusDeckCardError: null,
  },
  'DECK_ERROR'
) {
  setCreateDeckError(error: ApolloError | null): DeckError {
    return this.set('createDeckError', error);
  }
  setFetchDecksError(error: ApolloError | null): DeckError {
    return this.set('fetchDecksError', error);
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
