import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { set as setSelectedDeckId } from '../actions/selected-deck-id';

export default reducerWithInitialState<string | null>(null).case(
  setSelectedDeckId,
  (state, payload) => payload
);
