import { auth } from 'firebase';

export const login = async () => {
  return await auth().signInWithPopup(new auth.TwitterAuthProvider());
};

export const logout = async () => {
  return await auth().signOut();
};
