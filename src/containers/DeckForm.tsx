import { connect } from 'react-redux';
import { AppState } from '../store';
import { Dispatch } from 'redux';
import { Action } from 'typescript-fsa';
import { setSelectedDeckId } from '../actions/selected-deck-id';
import DeckForm from '../components/DeckForm';

const mapStateToProps = (state: AppState) => ({
  selectedDeckId: state.selectedDeckId,
});

const mapDispatchToProps = (dispatch: Dispatch<Action<string>>) => ({
  setSelectedDeckId: (selectedDeckId: string) => {
    dispatch(setSelectedDeckId(selectedDeckId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DeckForm);
