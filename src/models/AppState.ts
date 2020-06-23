import ActionStatus from './ActionStatus';
import { ApolloError } from 'apollo-client';
import User from './User';
import DeckModal from './DeckModal';
import SingleGameCardModal from './SingleGameCardModal';
import MorgueGameCardListModal from './MorgueGameCardListModal';
import { Record } from 'immutable';

export interface AppStateInterface {
  selectedDeckId: number | null;
  user: User;
  plusDeckCardError: ApolloError | null;
  minusDeckCardError: ApolloError | null;
  createDeckError: ApolloError | null;
  deckModal: DeckModal;
  singleGameCardModal: SingleGameCardModal;
  morgueGameCardListModal: MorgueGameCardListModal;
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
    singleGameCardModal: new SingleGameCardModal(),
    morgueGameCardListModal: new MorgueGameCardListModal(),
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
  setSingleGameCardModal(data: SingleGameCardModal) {
    return this.set('singleGameCardModal', data);
  }
  setMorgueGameCardListModal(data: MorgueGameCardListModal) {
    return this.set('morgueGameCardListModal', data);
  }
  setActionStatus(data: ActionStatus) {
    return this.set('actionStatus', data);
  }
}
