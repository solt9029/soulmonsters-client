import React from 'react';
import { Col } from 'reactstrap';
import { Container, Row } from 'reactstrap';
import styled from 'styled-components';
import CardList from './CardList';

const StyledContainer = styled(Container)`
  text-align: center;
`;

const StyledRow = styled(Row)`
  margin-top: 50px;
`;

export default function Description() {
  return (
    <StyledContainer fluid>
      <StyledRow top={100}>
        <Col xs={12}>
          <h2>オンライン対戦カードゲーム</h2>
          <h2>『ソウルモンスターズ』</h2>
          <div>
            <p>
              ソウルとエナジーを溜めて、様々なカードを駆使して相手を倒すカードゲームです。
            </p>
          </div>
        </Col>
      </StyledRow>
      <StyledRow top={100}>
        <CardList />
      </StyledRow>
    </StyledContainer>
  );
}
