import React, { useContext } from 'react';
import { Card, CardImg } from 'reactstrap';
import styled from 'styled-components';
import { BACK_SIDE_CARD } from '../../constants/pictures';
import { AppContext } from '../App';
import { GameCardFragment } from '../../graphql/generated/graphql-client';
import { findTopGameCard } from '../../utils/game';

const StyledCard = styled(Card)`
  min-width: 60px;
  width: 60px;
  margin: 5px;
`;

export type GameCardStackProps = {
  data: GameCardFragment[];
};

export default function GameCardStack({ data }: GameCardStackProps) {
  const {
    state: { gameCardListModal },
    dispatch,
  } = useContext(AppContext);

  const topGameCard = findTopGameCard(data);

  const handleClick = () => {
    dispatch({
      type: 'SET_GAME_CARD_LIST_MODAL',
      payload: gameCardListModal.open(data),
    });
  };

  return (
    <StyledCard onClick={handleClick}>
      <CardImg src={topGameCard?.card?.picture || BACK_SIDE_CARD} />
    </StyledCard>
  );
}
