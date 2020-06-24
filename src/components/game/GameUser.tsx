import React, { useContext } from 'react';
import { Col } from '../../styled/reactstrap';
import styled from 'styled-components';
import {
  useGameQuery,
  useActiveGameIdQuery,
} from '../../graphql/generated/graphql-client';
import { AppContext } from '../App';
import { findGameUser } from '../../utils/game';
import GameActionButton from './GameActionButton';

const StyledCol = styled(Col)`
  color: white;
  align-items: center;
  -webkit-align-items: center;
  display: flex;
  overflow-x: auto;
  ::before,
  ::after {
    content: '';
    margin: auto;
  }
`;

const UserLogo = styled.div<{ picture?: string | null }>`
  ${(props) => `background: url('${props.picture}') no-repeat left center;`}
  background-size: contain;
  border-radius: 50%;
  border: none;
  &:focus {
    box-shadow: none;
  }
  &:hover {
    border-color: #eee;
  }
  height: 45px;
  width: 45px;
`;

const UserInfo = styled.div`
  margin-left: 10px;
`;

const UserName = styled.div`
  font-weight: bold;
`;

export type GameUserProps = {
  isYours: boolean;
};

export default function GameUser({ isYours }: GameUserProps) {
  const {
    state: { user },
  } = useContext(AppContext);

  const activeGameIdQueryResult = useActiveGameIdQuery();
  const activeGameId = activeGameIdQueryResult.data?.activeGameId || 1;
  const gameQueryResult = useGameQuery({
    variables: { id: activeGameId },
  });

  if (!activeGameIdQueryResult.data || !gameQueryResult.data || !user.data) {
    return <></>;
  }

  const gameUsers = gameQueryResult.data?.game.gameUsers;
  const gameUser = findGameUser(gameUsers, user, { isYours });

  return (
    <>
      <StyledCol lg={6} xs={6}>
        <UserLogo picture={gameUser?.user.photoURL} />
        <UserInfo>
          <UserName>{gameUser?.user.displayName}</UserName>
          <div>
            ライフ：{gameUser?.lifePoint} / エナジー：
            {gameUser?.energy}
          </div>
        </UserInfo>
      </StyledCol>
      <StyledCol lg={6} xs={6}>
        {gameUser?.actionTypes.map((value) => (
          <GameActionButton type={value} />
        ))}
      </StyledCol>
    </>
  );
}
