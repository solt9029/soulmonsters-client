import { connect } from 'react-redux';
import App from '../components/App';
import { initializeUser } from '../actions/user';
import { AppState } from '../store';

const mapStateToProps = (state: AppState) => ({
  user: state.user,
});

const mapDispatchToProps = {
  initializeUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
