import { GameCardFragment } from './../graphql/generated/graphql-client';
import { Record } from 'immutable';

export interface SingleGameCardModalInterface {
  data?: GameCardFragment;
  isOpen: boolean;
}

export default class SingleGameCardModal extends Record<
  SingleGameCardModalInterface
>(
  {
    data: undefined,
    isOpen: false,
  },
  'SingleGameCardModal'
) {
  open(data: GameCardFragment): SingleGameCardModal {
    return new SingleGameCardModal({ data, isOpen: true });
  }
  close(): SingleGameCardModal {
    return this.set('isOpen', false);
  }
}
