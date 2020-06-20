import ActionStatus from './ActionStatus';
import { ApolloError } from 'apollo-client';
import User from './User';
import DeckModal from './DeckModal';
import GameModal from './GameModal';
import { Record } from 'immutable';

export interface AppStateInterface {
  selectedDeckId: number | null;
  user: User;
  plusDeckCardError: ApolloError | null;
  minusDeckCardError: ApolloError | null;
  createDeckError: ApolloError | null;
  deckModal: DeckModal;
  gameModal: GameModal;
  actionStatus: ActionStatus;
}

export type ErrorName =
  | 'plusDeckCardError'
  | 'minusDeckCardError'
  | 'createDeckError';

export default class AppState extends Record<AppStateInterface>(
  {
    selectedDeckId: null,
    user: new User(),
    plusDeckCardError: null,
    minusDeckCardError: null,
    createDeckError: null,
    deckModal: new DeckModal(),
    gameModal: new GameModal(),
    actionStatus: new ActionStatus(),
  },
  'AppState'
) {
  setSelectedDeckId(data: number | null) {
    return this.set('selectedDeckId', data);
  }
  setUser(data: User) {
    return this.set('user', data);
  }
  setError(data: { name: ErrorName; error: ApolloError }) {
    return this.set(data.name, data.error);
  }
  resetError(data: ErrorName) {
    return this.set(data, null);
  }
  setDeckModal(data: DeckModal) {
    return this.set('deckModal', data);
  }
  setGameModal(data: GameModal) {
    return this.set('gameModal', data);
  }
  setActionStatus(data: ActionStatus) {
    return this.set('actionStatus', data);
  }
}
