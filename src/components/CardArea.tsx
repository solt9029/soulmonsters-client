import React from 'react';
import { Row, Col, Container, Alert } from 'reactstrap';
import Card from '../components/Card';
import { useCardsQuery } from '../graphql/generated/graphql-client';
import Area from '../styled/Area';
import * as AreaTypes from '../constants/area-types';
import * as ItemTypes from '../constants/item-types';
import { useDrop } from 'react-dnd';

export default function CardArea() {
  const { data, error, loading } = useCardsQuery();

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: ItemTypes.DECK_CARD,
    drop: () => ({ type: AreaTypes.CARD }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <Area ref={drop} isActive={canDrop && isOver} isRight>
      <Container style={{ marginTop: '12px' }}>
        <Row style={{ color: 'white' }}>
          {loading && (
            <Col style={{ marginBottom: '12px' }} lg={12}>
              カード情報をロード中です
            </Col>
          )}
          {error !== undefined && (
            <Col lg={12}>
              <Alert color="danger">
                カード情報の取得中にエラーが発生しました
              </Alert>
            </Col>
          )}
          {data?.cards.map((card, index) => (
            <Card id={card.id} picture={card.picture}></Card>
          ))}
        </Row>
      </Container>
    </Area>
  );
}
