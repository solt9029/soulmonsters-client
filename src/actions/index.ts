import MorgueGameCardListModal from '../models/MorgueGameCardListModal';
import { ApolloError } from 'apollo-client';
import { ErrorName } from '../models/AppState';
import DeckModal from '../models/DeckModal';
import User from '../models/User';
import ActionStatus from '../models/ActionStatus';
import SingleGameCardModal from '../models/SingleGameCardModal';

type Action =
  | {
      type: 'SET_USER';
      payload: User;
    }
  | {
      type: 'SET_SELECTED_DECK_ID';
      payload: number | null;
    }
  | {
      type: 'SET_ERROR';
      payload: {
        name: ErrorName;
        error: ApolloError;
      };
    }
  | {
      type: 'RESET_ERROR';
      payload: ErrorName;
    }
  | {
      type: 'SET_DECK_MODAL';
      payload: DeckModal;
    }
  | {
      type: 'SET_ACTION_STATUS';
      payload: ActionStatus;
    }
  | {
      type: 'SET_SINGLE_GAME_CARD_MODAL';
      payload: SingleGameCardModal;
    }
  | {
      type: 'SET_MORGUE_GAME_CARD_LIST_MODAL';
      payload: MorgueGameCardListModal;
    };

export default Action;
