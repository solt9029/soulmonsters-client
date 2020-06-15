import { auth } from 'firebase';
import { Dispatch } from 'react';
import Action from '.';
import AppState from '../models/AppState';

export const login = async (
  dispatch: Dispatch<Action>,
  { user }: Pick<AppState, 'user'>
) => {
  dispatch({ type: 'SET_USER', payload: user.startLoading() });
  try {
    const data = await auth().signInWithPopup(new auth.TwitterAuthProvider());
    if (data.user === null) {
      throw new Error();
    }
    dispatch({ type: 'SET_USER', payload: user.doneLogin(data.user) });
  } catch (error) {
    dispatch({ type: 'SET_USER', payload: user.failedLogin(error) });
  }
};
