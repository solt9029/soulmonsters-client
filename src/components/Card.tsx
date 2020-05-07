import React from 'react';
import { Col, Card as RCard, CardImg } from 'reactstrap';
import { useDrag, DragSourceMonitor } from 'react-dnd';

interface Props {
  picture: string;
  isInDeck?: boolean;
}

export default function Card({ picture, isInDeck }: Props) {
  const type = isInDeck ? 'deck-card' : 'card';
  const drag = useDrag({
    item: { name: picture, type },
    end: (item: { name: string } | undefined, monitor: DragSourceMonitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        alert(`You dropped ${item.name} into ${dropResult.name}!`);
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
