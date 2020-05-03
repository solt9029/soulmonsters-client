import { withRouter } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { connect } from 'react-redux';
import { AppState } from '../store';
import { Dispatch } from 'redux';
import { Action } from 'typescript-fsa';
import { login, logout } from '../actions/user';

const mapStateToProps = (state: AppState) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch: Dispatch<Action<void>>) => ({
  startLogin: () => {
    dispatch(login.started());
  },
  startLogout: () => {
    dispatch(logout.started());
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));
