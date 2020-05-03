import { reducerWithInitialState } from 'typescript-fsa-reducers';
import * as actions from '../actions/user';
import User from '../models/User';

export default reducerWithInitialState(new User())
  .case(actions.login.started, (state) => state.startLoading())
  .case(actions.login.done, (state: User, success) =>
    state.doneLogin(success.result)
  )
  .case(actions.login.failed, (state, failure) => state.failed(failure.error))
  .case(actions.initialize, (state) => state.initialize());
