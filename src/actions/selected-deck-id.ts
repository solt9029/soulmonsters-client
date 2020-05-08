import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory('SEKECTED_DECK_ID');

export const setSelectedDeckId = actionCreator<string | null>(
  'SET_SELECTED_DECK_ID'
);
