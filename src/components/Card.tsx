import React from 'react';
import { Col, Card as RCard, CardImg } from 'reactstrap';
import { useDrag, DragSourceMonitor } from 'react-dnd';
import * as ItemTypes from '../constants/item-types';

interface Props {
  id: string;
  picture: string;
  isInDeck?: boolean;
}

export default function Card({ id, picture, isInDeck }: Props) {
  const type = isInDeck ? ItemTypes.DECK_CARD : ItemTypes.CARD;

  const drag = useDrag({
    item: { id, type },
    end: (item: { id: string } | undefined, monitor: DragSourceMonitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        alert(`You dropped ${item.id} into ${dropResult.type}!`);
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
