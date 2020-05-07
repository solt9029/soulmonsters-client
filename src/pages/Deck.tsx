import React from 'react';
import styled from 'styled-components';
import { Container, Row, Col, UncontrolledAlert } from 'reactstrap';
import Card from '../components/Card';
import { useCardsQuery } from '../graphql/generated/graphql-client';
import DeckArea from '../containers/DeckArea';

const Area = styled.div<{ isLeft: boolean }>`
  height: 100vh;
  width: 100%;
  background-size: cover;
  background-color: #222;
  border: solid 5px #ccc;
  border-left-width: ${(props) => (props.isLeft ? '5px' : '0px')};
  border-collapse: collapse;
`;

const StyledContainer = styled(Container)`
  margin-top: 12px;
`;

const StyledRow = styled(Row)`
  color: white;
`;

export default function Deck() {
  const { data, error, loading } = useCardsQuery();

  return (
    <div style={{ display: 'flex', backgroundColor: '#222' }}>
      <Area isLeft={true}>
        <StyledContainer>
          <DeckArea />
        </StyledContainer>
      </Area>

      <Area isLeft={false}>
        <StyledContainer>
          <StyledRow>
            {loading && (
              <Col style={{ marginBottom: '12px' }} lg={12}>
                カード情報をロード中です
              </Col>
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
        </StyledContainer>
      </Area>
    </div>
  );
}
