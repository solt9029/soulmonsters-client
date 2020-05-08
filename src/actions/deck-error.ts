import actionCreatorFactory from 'typescript-fsa';
import { ApolloError } from 'apollo-client';

const actionCreator = actionCreatorFactory('DECK_ERROR');

export const setCreateDeckError = actionCreator<ApolloError | null>(
  'SET_CREATE_DECK_ERROR'
);
export const setFetchDeckCardsError = actionCreator<ApolloError | null>(
  'SET_FETCH_DECK_CARDS_ERROR'
);
export const setPlusDeckCardError = actionCreator<ApolloError | null>(
  'SET_PLUS_DECK_CARD_ERROR'
);
export const setMinusDeckCardError = actionCreator<ApolloError | null>(
  'SET_MINUS_DECK_CARD_ERROR'
);
