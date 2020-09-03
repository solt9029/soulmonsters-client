import React, { useContext } from 'react';
import { Card, CardImg } from 'reactstrap';
import styled from 'styled-components';
import { BACK_SIDE_CARD } from '../../constants/pictures';
import { AppContext } from '../App';
import {
  GameCardFragment,
  Zone,
  useDispatchGameActionMutation,
  GameDocument,
  useActiveGameIdQuery,
} from '../../graphql/generated/graphql-client';
import ActionStatus from '../../models/ActionStatus';
import { ActionStep } from '../../constants/action-steps';

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
    state: { gameCardModal, actionStatus, user },
    dispatch,
  } = useContext(AppContext);

  const activeGameIdQueryResult = useActiveGameIdQuery();
  const activeGameId = activeGameIdQueryResult.data?.activeGameId || 1;

  const [dispatchGameAction] = useDispatchGameActionMutation({
    refetchQueries: [{ query: GameDocument, variables: { id: activeGameId } }],
    onCompleted: () => {},
    onError: (error) => {},
  });

  const handleClick = async () => {
    // open modal
    if (data.card && !actionStatus.isStarted()) {
      await dispatch({
        type: 'SET_GAME_CARD_MODAL',
        payload: gameCardModal.open(data),
      });
      return;
    }

    // handle action operation
    let newActionStatus = new ActionStatus();

    if (
      actionStatus.step === ActionStep.SELECT_ATTACK_TARGET &&
      data.zone === Zone.Battle &&
      data.currentUserId !== user.data?.uid
    ) {
      newActionStatus = actionStatus.addPayload({
        key: 'targetGameCardIds',
        id: data.id,
      });
    }

    if (newActionStatus.isCompleted()) {
      const { type, payload, gameCard } = newActionStatus;
      await dispatchGameAction({
        variables: {
          id: activeGameId,
          data: { type: type!, payload, gameCardId: gameCard?.id },
        },
      });
      newActionStatus = new ActionStatus();
    }

    await dispatch({
      type: 'SET_ACTION_STATUS',
      payload: newActionStatus,
    });
  };

  return (
    <StyledCard onClick={handleClick}>
      <CardImg src={data.card?.picture || BACK_SIDE_CARD} />
    </StyledCard>
  );
}
