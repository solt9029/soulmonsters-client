import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory('USER_DATA');

export const setSelectedDeckId = actionCreator<string | null>(
  'SET_SELECTED_DECK_ID'
);
