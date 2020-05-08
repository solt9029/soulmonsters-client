import React from 'react';
import DeckArea from '../components/DeckArea';
import CardArea from '../components/CardArea';
import AreaWrapper from '../styled/AreaWrapper';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';
import { connect } from 'react-redux';
import { AppState } from '../store';
import { Dispatch } from 'redux';
import { Action } from 'typescript-fsa';
import { set as setSelectedDeckId } from '../actions/selected-deck-id';

interface Props {
  setSelectedDeckId: (selectedDeckId: string | null) => void;
  selectedDeckId: string | null;
}

const Deck = ({ selectedDeckId, setSelectedDeckId }: Props) => {
  return (
    <DndProvider backend={Backend}>
      <AreaWrapper>
        <DeckArea
          selectedDeckId={selectedDeckId}
          setSelectedDeckId={setSelectedDeckId}
        />
        <CardArea selectedDeckId={selectedDeckId} />
      </AreaWrapper>
    </DndProvider>
  );
};

const mapStateToProps = (state: AppState) => ({
  selectedDeckId: state.selectedDeckId,
});

const mapDispatchToProps = (dispatch: Dispatch<Action<string | null>>) => ({
  setSelectedDeckId: (selectedDeckId: string | null) => {
    dispatch(setSelectedDeckId(selectedDeckId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Deck);
