import React, { useContext } from 'react';
import { Card, CardImg } from 'reactstrap';
import styled from 'styled-components';
import { BACK_SIDE_CARD } from '../../constants/pictures';
import { AppContext } from '../App';
import { GameCardFragment } from '../../graphql/generated/graphql-client';

const StyledCard = styled(Card)`
  min-width: 60px;
  width: 60px;
  margin: 5px;
`;

export type GameCardProps = {
  data: GameCardFragment;
};

export default function GameCard({ data }: GameCardProps) {
  const {
    state: { gameCardModal },
    dispatch,
  } = useContext(AppContext);

  const handleClick = () => {
    if (data.card) {
      dispatch({
        type: 'SET_GAME_CARD_MODAL',
        payload: gameCardModal.open(data),
      });
    }
  };

  return (
    <StyledCard onClick={handleClick}>
      <CardImg src={data.card?.picture || BACK_SIDE_CARD} />
    </StyledCard>
  );
}
