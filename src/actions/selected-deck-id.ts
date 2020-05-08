import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory('SEKECTED_DECK_ID');

export const set = actionCreator<string | null>('SET');
