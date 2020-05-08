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
import { setSelectedDeckId } from '../actions/selected-deck-id';
import { ApolloError } from 'apollo-client';
import * as deckErrorActions from '../actions/deck-error';
import { DeckErrorInterface } from '../models/DeckError';

interface Props {
  setSelectedDeckId: (selectedDeckId: string | null) => void;
  setCreateDeckError: (error: ApolloError | null) => void;
  setFetchDecksError: (error: ApolloError | null) => void;
  setFetchDeckCardsError: (error: ApolloError | null) => void;
  setPlusDeckCardError: (error: ApolloError | null) => void;
  setMinusDeckCardError: (error: ApolloError | null) => void;
  selectedDeckId: string | null;
  deckError: DeckErrorInterface;
}

const Deck = (props: Props) => {
  return (
    <DndProvider backend={Backend}>
      <AreaWrapper>
        <DeckArea
          selectedDeckId={props.selectedDeckId}
          setSelectedDeckId={props.setSelectedDeckId}
          setCreateDeckError={props.setCreateDeckError}
          setFetchDecksError={props.setFetchDecksError}
          setFetchDeckCardsError={props.setFetchDeckCardsError}
          deckError={props.deckError}
        />
        <CardArea selectedDeckId={props.selectedDeckId} />
      </AreaWrapper>
    </DndProvider>
  );
};

const mapStateToProps = (state: AppState) => ({
  selectedDeckId: state.selectedDeckId,
  deckError: state.deckError,
});

const mapDispatchToProps = (
  dispatch: Dispatch<Action<ApolloError | string | null>>
) => ({
  setSelectedDeckId: (selectedDeckId: string | null) => {
    dispatch(setSelectedDeckId(selectedDeckId));
  },
  setCreateDeckError: (error: ApolloError | null) => {
    dispatch(deckErrorActions.setCreateDeckError(error));
  },
  setFetchDecksError: (error: ApolloError | null) => {
    dispatch(deckErrorActions.setFetchDecksError(error));
  },
  setFetchDeckCardsError: (error: ApolloError | null) => {
    dispatch(deckErrorActions.setFetchDeckCardsError(error));
  },
  setPlusDeckCardError: (error: ApolloError | null) => {
    dispatch(deckErrorActions.setPlusDeckCardError(error));
  },
  setMinusDeckCardError: (error: ApolloError | null) => {
    dispatch(deckErrorActions.setMinusDeckCardError(error));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Deck);
