import { GameCard } from './../graphql/generated/graphql-client';
import { Record } from 'immutable';

export interface GameModalInterface {
  data: GameCard | null;
  isOpen: boolean;
}

export default class GameModal extends Record<GameModalInterface>(
  {
    data: null,
    isOpen: false,
  },
  'DeckModal'
) {
  open(data: GameCard): GameModal {
    return new GameModal({ data, isOpen: true });
  }
  close(): GameModal {
    return this.set('isOpen', false);
  }
}
