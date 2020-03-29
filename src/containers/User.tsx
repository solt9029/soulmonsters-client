import * as actions from '../actions/user';
import User from '../components/User';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { Action } from 'typescript-fsa';

export default connect(null, (dispatch: Dispatch<Action<void>>) => ({
  startLogin: () => {
    dispatch(actions.login.started());
  },
}))(User);
