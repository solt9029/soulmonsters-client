import React, { useContext } from 'react';
import { Col, Card as RCard, CardImg } from 'reactstrap';
import { useDrag, DragSourceMonitor } from 'react-dnd';
import * as ItemTypes from '../constants/item-types';
import {
  usePlusDeckCardMutation,
  useMinusDeckCardMutation,
  DeckCardsDocument,
} from '../graphql/generated/graphql-client';
import * as AreaTypes from '../constants/area-types';
import { AppContext } from './App';
import styled from 'styled-components';

const StyledCol = styled(Col)`
  margin-bottom: 12px;
  padding: 0px 6px;
`;

interface Props {
  id: number;
  picture: string;
  isInDeck?: boolean;
}

export default function Card({ id, picture, isInDeck }: Props) {
  const {
    selectedDeckId,
    setPlusDeckCardError,
    setMinusDeckCardError,
    setDeckModal,
  } = useContext(AppContext);

  const refetchDeckCardsQuery = {
    query: DeckCardsDocument,
    variables: { deckId: selectedDeckId },
  };

  const [plusDeckCard] = usePlusDeckCardMutation({
    refetchQueries: [refetchDeckCardsQuery],
    onCompleted: () => {
      setPlusDeckCardError(null);
    },
    onError: (error) => {
      setPlusDeckCardError(error);
    },
  });

  const [minusDeckCard] = useMinusDeckCardMutation({
    refetchQueries: [refetchDeckCardsQuery],
    onCompleted: () => {
      setMinusDeckCardError(null);
    },
    onError: (error) => {
      setMinusDeckCardError(error);
    },
  });

  const handleClick = () => {
    setDeckModal({ isInDeck: isInDeck === true, picture, cardId: id });
  };

  const type = isInDeck ? ItemTypes.DECK_CARD : ItemTypes.CARD;

  const drag = useDrag({
    item: { id, type },
    end: (item: { id: string } | undefined, monitor: DragSourceMonitor) => {
      const dropResult = monitor.getDropResult();
      if (!item || !dropResult || !selectedDeckId) {
        return;
      }
      const options = { variables: { deckId: selectedDeckId, cardId: id } };
      if (dropResult.type === AreaTypes.DECK) {
        plusDeckCard(options);
      } else if (dropResult.type === AreaTypes.CARD) {
        minusDeckCard(options);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <StyledCol lg={2} md={3} sm={4} xs={6}>
      <RCard onClick={handleClick} innerRef={drag[1]}>
        <CardImg src={picture} />
      </RCard>
    </StyledCol>
  );
}
