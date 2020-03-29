import { Record } from 'immutable';
import firebase from 'firebase';

export interface UserInterface {
  photoURL: string | null;
  displayName: string | null;
  uid: string | null;
  error: Error | null;
  isLoading: boolean;
}

export default class User extends Record<UserInterface>(
  {
    photoURL: null,
    displayName: null,
    uid: null,
    error: null,
    isLoading: false,
  },
  'User'
) {
  startLoading(): User {
    return new User({
      isLoading: true,
    });
  }
  doneLogin(firebaseUser: firebase.User): User {
    return new User({
      photoURL: firebaseUser.photoURL,
      displayName: firebaseUser.displayName,
      uid: firebaseUser.uid,
    });
  }
  doneLogout(): User {
    return new User();
  }
  failed(error: Error): User {
    return new User({ error });
  }
}
