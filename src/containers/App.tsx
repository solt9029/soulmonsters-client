import { connect } from 'react-redux';
import App from '../components/App';
import { initialize as initializeUser } from '../actions/user';

const mapDispatchToProps = {
  initializeUser,
};

export default connect(null, mapDispatchToProps)(App);
