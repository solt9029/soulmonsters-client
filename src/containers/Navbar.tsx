import { withRouter } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { connect } from 'react-redux';
import { AppState } from '../store';

const mapStateToProps = (state: AppState) => ({
  user: state.user,
});

export default withRouter(connect(mapStateToProps, null)(Navbar));
