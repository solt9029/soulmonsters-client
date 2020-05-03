import { reducerWithInitialState } from 'typescript-fsa-reducers';
import * as actions from '../actions/user';
import User from '../models/User';

export default reducerWithInitialState(new User())
  .case(actions.login.started, (state) => state.startLoading())
  .case(actions.login.done, (state: User, success) =>
    state.doneLogin(success.result)
  )
  .case(actions.login.failed, (state, failure) =>
    state.failedLogin(failure.error)
  )
  .case(actions.logout.started, (state) => state.startLoading())
  .case(actions.logout.done, (state) => state.doneLogout())
  .case(actions.logout.failed, (state, failure) =>
    state.failedLogout(failure.error)
  )
  .case(actions.initialize, (state) => state.initialize());
