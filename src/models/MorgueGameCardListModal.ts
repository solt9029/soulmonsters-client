import { GameCardFragment } from './../graphql/generated/graphql-client';
import { Record } from 'immutable';

export interface MorgueGameCardListModalInterface {
  data: GameCardFragment[];
  isOpen: boolean;
}

export default class MorgueGameCardListModal extends Record<
  MorgueGameCardListModalInterface
>(
  {
    data: [],
    isOpen: false,
  },
  'MorgueGameCardListModal'
) {
  open(data: GameCardFragment[]): MorgueGameCardListModal {
    return new MorgueGameCardListModal({ data, isOpen: true });
  }
  close(): MorgueGameCardListModal {
    return this.set('isOpen', false);
  }
}
