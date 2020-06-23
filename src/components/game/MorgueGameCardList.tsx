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

export type MorgueGameCardListProps = {
  data: GameCardFragment[];
};

export default function MorgueGameCardList({ data }: MorgueGameCardListProps) {
  const {
    state: { morgueGameCardListModal },
    dispatch,
  } = useContext(AppContext);

  const topGameCard = findTopGameCard(data);

  const handleClick = () => {
    dispatch({
      type: 'SET_MORGUE_GAME_CARD_LIST_MODAL',
      payload: morgueGameCardListModal.open(data),
    });
  };

  return (
    <StyledCard onClick={handleClick}>
      <CardImg src={topGameCard?.card?.picture || BACK_SIDE_CARD} />
    </StyledCard>
  );
}
