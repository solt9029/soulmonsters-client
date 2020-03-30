import * as actions from '../actions/user';
import User from '../components/User';
import { connect } from 'react-redux';
import { AppState } from '../store';
import { connect as connectWebsocket } from '@giantmachines/redux-websocket';

export default connect(
  (state: AppState) => ({
    user: state.user,
  }),
  (dispatch: any) => ({
    startLogin: () => {
      dispatch(actions.login.started());
    },
    connectWebsocket: () => {
      dispatch(connectWebsocket('wss://websocket-echo-server.herokuapp.com'));
    },
  })
)(User);
