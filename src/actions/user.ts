import actionCreatorFactory from 'typescript-fsa';
import firebase from 'firebase';

const actionCreator = actionCreatorFactory('USER');

export const login = actionCreator.async<void, firebase.User, Error>('LOGIN');
export const logout = actionCreator.async<void, void, Error>('LOGOUT');
export const initialize = actionCreator<void>('INITIALIZE');
