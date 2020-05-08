import { reducerWithInitialState } from 'typescript-fsa-reducers';
import * as actions from '../actions/deck-error';
import DeckError from '../models/DeckError';

export default reducerWithInitialState<DeckError>(new DeckError())
  .case(actions.setCreateDeckError, (state, payload) =>
    state.setCreateDeckError(payload)
  )
  .case(actions.setFetchDecksError, (state, payload) =>
    state.setFetchDecksError(payload)
  )
  .case(actions.setFetchDeckCardsError, (state, payload) =>
    state.setFetchDeckCardsError(payload)
  )
  .case(actions.setPlusDeckCardError, (state, payload) =>
    state.setPlusDeckCardError(payload)
  )
  .case(actions.setMinusDeckCardError, (state, payload) =>
    state.setMinusDeckCardError(payload)
  );
