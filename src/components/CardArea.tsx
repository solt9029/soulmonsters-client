import React from 'react';
import { Row, Col, Container, Alert } from 'reactstrap';
import Card from '../components/Card';
import { useCardsQuery } from '../graphql/generated/graphql-client';
import Area from '../styled/Area';
import * as AreaTypes from '../constants/area-types';
import * as ItemTypes from '../constants/item-types';
import { useDrop } from 'react-dnd';
import styled from 'styled-components';

const StyledContainer = styled(Container)`
  margin-top: 12px;
`;

const StyledRow = styled(Row)`
  color: white;
`;

const StyledCol = styled(Col)`
  margin-bottom: 12px;
`;

const StyledCardCol = styled(StyledCol)`
  padding: 0px 6px;
`;

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
      <StyledContainer>
        <StyledRow>
          {loading && <StyledCol lg={12}>カード情報をロード中です</StyledCol>}
          {error !== undefined && (
            <Col lg={12}>
              <Alert color="danger">
                カード情報の取得中にエラーが発生しました
              </Alert>
            </Col>
          )}
          {data?.cards.map((card, index) => (
            <StyledCardCol lg={2} md={3} sm={4} xs={6}>
              <Card id={card.id} picture={card.picture}></Card>
            </StyledCardCol>
          ))}
        </StyledRow>
      </StyledContainer>
    </Area>
  );
}
