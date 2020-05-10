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

interface Props {
  id: string;
  picture: string;
  isInDeck?: boolean;
}

export default function Card({ id, picture, isInDeck }: Props) {
  const { selectedDeckId, setPlusDeckCardError } = useContext(AppContext);

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
    onError: () => {},
  });

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
    <Col
      style={{ marginBottom: '12px', padding: '0px 6px' }}
      lg={2}
      md={3}
      sm={4}
      xs={6}
    >
      <RCard innerRef={drag[1]}>
        <CardImg src={picture} />
      </RCard>
    </Col>
  );
}
