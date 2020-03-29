import { auth } from 'firebase';

export const login = () => {
  return auth()
    .signInWithPopup(new auth.TwitterAuthProvider())
    .then((result) => result.user)
    .catch((error) => error);
};
