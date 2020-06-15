import React, { useContext } from 'react';
import { Container, Row, Col } from '../../styled/reactstrap';
import { Alert, Button } from 'reactstrap';
import styled from 'styled-components';
import {
  useGameQuery,
  Zone,
  useActiveGameIdQuery,
} from '../../graphql/generated/graphql-client';
import { AppContext } from '../App';
import { findGameCards, findTopGameCard, findGameUser } from '../../utils/game';
import GameCard from './GameCard';
import GameActions from '../../constants/game-actions';

const StyledContainer = styled(Container)`
  color: white;
`;

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

const StyledRow = styled(Row)`
  display: flex;
  height: 100px;
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

const StyledButton = styled(Button)`
  width: 100%;
  & + & {
    margin-left: 10px;
  }
`;

export default function GameCardArea() {
  const {
    state: { user },
  } = useContext(AppContext);

  const activeGameIdQueryResult = useActiveGameIdQuery();

  const { data, error, loading } = useGameQuery({
    variables: { id: activeGameIdQueryResult.data?.activeGameId || 1 },
  });

  if (error) {
    return (
      <StyledContainer marginTop={12}>
        <Alert color="danger">ゲーム情報の取得中にエラーが発生しました</Alert>
      </StyledContainer>
    );
  }

  if (loading) {
    return (
      <StyledContainer marginTop={12}>
        <Col lg={12}>ゲーム情報をロード中です</Col>
      </StyledContainer>
    );
  }

  const gameUsers = data?.game.gameUsers;
  const opponentGameUser = findGameUser(gameUsers, user, { isYours: false });
  const yourGameUser = findGameUser(gameUsers, user, { isYours: true });

  const gameCards = data?.game.gameCards;
  const yourMorgueTopGameCard = findTopGameCard(gameCards, user, {
    zone: Zone.Morgue,
    isYours: true,
  });
  const opponentMorgueTopGameCard = findTopGameCard(gameCards, user, {
    zone: Zone.Morgue,
    isYours: false,
  });

  return (
    <Container marginTop={20} marginBottom={20}>
      <Row>
        <StyledCol lg={6}>
          <UserLogo picture={opponentGameUser?.user.photoURL} />
          <UserInfo>
            <UserName>{opponentGameUser?.user.displayName}</UserName>
            <div>
              ライフ：{opponentGameUser?.lifePoint} / エナジー：
              {opponentGameUser?.energy}
            </div>
          </UserInfo>
        </StyledCol>
      </Row>
      <StyledRow marginTop={5}>
        <StyledCol lg={12}>
          {data?.game.gameCards
            .filter(
              (value) =>
                value.zone === Zone.Hand &&
                value.currentUserId !== user.data?.uid
            )
            .map(() => (
              <GameCard />
            ))}
        </StyledCol>
      </StyledRow>
      <StyledRow marginTop={5}>
        <StyledCol lg={2} xs={2}>
          {findGameCards(gameCards, user, { zone: Zone.Deck, isYours: false })
            .length > 0 && <GameCard />}
        </StyledCol>
        <StyledCol lg={10} xs={10}>
          {data?.game.gameCards
            .filter(
              (value) =>
                value.zone === Zone.Soul &&
                value.currentUserId !== user.data?.uid
            )
            .map((value) => (
              <GameCard picture={value.card?.picture} />
            ))}
        </StyledCol>
      </StyledRow>
      <StyledRow marginTop={5}>
        <StyledCol lg={2} xs={2}>
          {opponentMorgueTopGameCard && (
            <GameCard picture={opponentMorgueTopGameCard.card?.picture} />
          )}
        </StyledCol>
        <StyledCol lg={10} xs={10}>
          {findGameCards(gameCards, user, {
            zone: Zone.Battle,
            isYours: false,
          }).map((value) => (
            <GameCard picture={value.card?.picture} />
          ))}
        </StyledCol>
      </StyledRow>

      <StyledRow marginTop={50}>
        {/** your battle zone */}
        <StyledCol lg={10} xs={10}>
          {data?.game.gameCards
            .filter(
              (value) =>
                value.zone === Zone.Battle &&
                value.currentUserId === user.data?.uid
            )
            .map((value) => (
              <GameCard picture={value.card?.picture} />
            ))}
        </StyledCol>

        {/** your morgue zone */}
        <StyledCol lg={2} xs={2}>
          {yourMorgueTopGameCard && (
            <GameCard picture={yourMorgueTopGameCard.card?.picture} />
          )}
        </StyledCol>
      </StyledRow>

      <StyledRow marginTop={5}>
        {/** your soul zone */}
        <StyledCol lg={10} xs={10}>
          {data?.game.gameCards
            .filter(
              (value) =>
                value.zone === Zone.Soul &&
                value.currentUserId === user.data?.uid
            )
            .map((value) => (
              <GameCard picture={value.card?.picture} />
            ))}
        </StyledCol>

        {/** your deck zone */}
        <StyledCol lg={2} xs={2}>
          {findGameCards(gameCards, user, { zone: Zone.Deck, isYours: true })
            .length > 0 && <GameCard />}
        </StyledCol>
      </StyledRow>

      <StyledRow marginTop={5}>
        {/** your hand zone */}
        <StyledCol lg={12}>
          {data?.game.gameCards
            .filter(
              (value) =>
                value.zone === Zone.Hand &&
                value.currentUserId === user.data?.uid
            )
            .map((value) => (
              <GameCard picture={value.card?.picture} />
            ))}
        </StyledCol>
      </StyledRow>

      <Row marginTop={5}>
        <StyledCol lg={6}>
          <UserLogo picture={user?.data?.photoURL} />
          <UserInfo>
            <UserName>{user?.data?.displayName}</UserName>
            <div>
              ライフ：{yourGameUser?.lifePoint} / エナジー：
              {yourGameUser?.energy}
            </div>
          </UserInfo>
        </StyledCol>
        <StyledCol>
          {yourGameUser?.actions.map((value) => {
            return (
              <StyledButton color="primary">{GameActions[value]}</StyledButton>
            );
          })}
        </StyledCol>
      </Row>
    </Container>
  );
}
