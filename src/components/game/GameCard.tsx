import React from 'react';
import { Card, CardImg } from 'reactstrap';
import styled from 'styled-components';

import { BACK_SIDE_CARD } from '../../constants/pictures';

const StyledCard = styled(Card)`
  min-width: 60px;
  width: 60px;
  margin: 5px;
`;

export default function GameCard({
  picture = BACK_SIDE_CARD,
}: {
  picture?: string;
}) {
  return (
    <StyledCard>
      <CardImg src={picture} />
    </StyledCard>
  );
}
