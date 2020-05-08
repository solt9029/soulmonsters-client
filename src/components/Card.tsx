import React from 'react';
import { Col, Card as RCard, CardImg } from 'reactstrap';
import { useDrag, DragSourceMonitor } from 'react-dnd';
import * as ItemTypes from '../constants/item-types';
import {
  usePlusDeckCardMutation,
  useMinusDeckCardMutation,
  DeckCardsDocument,
} from '../graphql/generated/graphql-client';
import * as AreaTypes from '../constants/area-types';
import * as ErrorMessages from '../constants/error-messages';

interface Props {
  id: string;
  picture: string;
  isInDeck?: boolean;
  selectedDeckId?: string | null;
}

export default function Card({ id, picture, isInDeck, selectedDeckId }: Props) {
  const refetchDeckCardsQuery = {
    query: DeckCardsDocument,
    variables: { deckId: selectedDeckId },
  };
  const [plusDeckCard, plusDeckCardResult] = usePlusDeckCardMutation({
    refetchQueries: [refetchDeckCardsQuery],
    onError: (error) => {
      if (error.message === ErrorMessages.MAX_COUNT) {
      }
    },
  });
  const [minusDeckCard, minusDeckCardResult] = useMinusDeckCardMutation({
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
      lg={3}
      md={4}
      sm={6}
      xs={6}
    >
      <RCard innerRef={drag[1]}>
        <CardImg src={picture} />
      </RCard>
    </Col>
  );
}
