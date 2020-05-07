import React from 'react';
import styled from 'styled-components';
import { Row, Col, UncontrolledAlert } from 'reactstrap';
import Card from '../components/Card';
import { useCardsQuery } from '../graphql/generated/graphql-client';

const StyledRow = styled(Row)`
  color: white;
`;

const StyledCol = styled(Col)`
  margin-bottom: 12px;
`;

export default function CardArea() {
  const { data, error, loading } = useCardsQuery();

  return (
    <div>
      <StyledRow>
        {loading && (
          <StyledCol style={{ marginBottom: '12px' }} lg={12}>
            カード情報をロード中です
          </StyledCol>
        )}
        {error !== undefined && (
          <Col lg={12}>
            <UncontrolledAlert color="danger">
              カード情報の取得中にエラーが発生しました
            </UncontrolledAlert>
          </Col>
        )}
        {data?.cards.map((card, index) => (
          <Card key={index} imageUrl={card.picture}></Card>
        ))}
      </StyledRow>
    </div>
  );
}
