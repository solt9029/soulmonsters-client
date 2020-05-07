import React from 'react';
import styled from 'styled-components';
import { Container } from 'reactstrap';
import DeckArea from '../containers/DeckArea';
import CardArea from '../components/CardArea';

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

export default function Deck() {
  return (
    <div style={{ display: 'flex', backgroundColor: '#222' }}>
      <Area isLeft={true}>
        <StyledContainer>
          <DeckArea />
        </StyledContainer>
      </Area>

      <Area isLeft={false}>
        <StyledContainer>
          <CardArea />
        </StyledContainer>
      </Area>
    </div>
  );
}
