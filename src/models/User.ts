import { Record } from 'immutable';
import firebase from 'firebase';

export interface UserInterface {
  data: firebase.User | null;
  error: Error | null;
  isLoading: boolean;
}

export default class User extends Record<UserInterface>(
  {
    data: null,
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
  doneLogin(data: firebase.User): User {
    return new User({ data });
  }
  doneLogout(): User {
    return new User();
  }
  failed(error: Error): User {
    return new User({ error });
  }
  initialize(): User {
    if (this.isLoading || this.error !== null) {
      return new User();
    }
    return this;
  }
}
