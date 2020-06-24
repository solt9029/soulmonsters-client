import React, { useContext } from 'react';
import { Container, Row, Col } from '../../styled/reactstrap';
import { Alert } from 'reactstrap';
import styled from 'styled-components';
import {
  useGameQuery,
  Zone,
  useActiveGameIdQuery,
} from '../../graphql/generated/graphql-client';
import { AppContext } from '../App';
import { findGameCards, findGameUser } from '../../utils/game';
import SingleGameCard from './SingleGameCard';
import GameActionButton from './GameActionButton';
import GameCardStack from './GameCardStack';
import GameUser from './GameUser';

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

export default function GameCardArea() {
  const {
    state: { user },
  } = useContext(AppContext);

  const activeGameIdQueryResult = useActiveGameIdQuery();
  const activeGameId = activeGameIdQueryResult.data?.activeGameId || 1;

  const { data, error, loading } = useGameQuery({
    variables: { id: activeGameId },
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
  const yourMorgueGameCards = findGameCards(gameCards, user, {
    zone: Zone.Morgue,
    isYours: true,
  });
  const opponentMorgueGameCards = findGameCards(gameCards, user, {
    zone: Zone.Morgue,
    isYours: false,
  });
  const yourDeckGameCards = findGameCards(gameCards, user, {
    zone: Zone.Deck,
    isYours: true,
  });
  const opponentDeckGameCards = findGameCards(gameCards, user, {
    zone: Zone.Deck,
    isYours: false,
  });

  return (
    <Container marginTop={20} marginBottom={20}>
      <Row>
        <GameUser />
      </Row>
      <StyledRow marginTop={5}>
        <StyledCol lg={12}>
          {findGameCards(gameCards, user, {
            zone: Zone.Hand,
            isYours: false,
          }).map((value) => (
            <SingleGameCard data={value} />
          ))}
        </StyledCol>
      </StyledRow>
      <StyledRow marginTop={5}>
        <StyledCol lg={2} xs={2}>
          {opponentDeckGameCards.length > 0 && (
            <GameCardStack data={opponentDeckGameCards} />
          )}
        </StyledCol>
        <StyledCol lg={10} xs={10}>
          {findGameCards(gameCards, user, {
            zone: Zone.Soul,
            isYours: false,
          }).map((value) => (
            <SingleGameCard data={value} />
          ))}
        </StyledCol>
      </StyledRow>
      <StyledRow marginTop={5}>
        <StyledCol lg={2} xs={2}>
          {opponentMorgueGameCards.length > 0 && (
            <GameCardStack data={opponentMorgueGameCards} />
          )}
        </StyledCol>
        <StyledCol lg={10} xs={10}>
          {findGameCards(gameCards, user, {
            zone: Zone.Battle,
            isYours: false,
          }).map((value) => (
            <SingleGameCard data={value} />
          ))}
        </StyledCol>
      </StyledRow>

      <StyledRow marginTop={50}>
        {/** your battle zone */}
        <StyledCol lg={10} xs={10}>
          {findGameCards(gameCards, user, {
            zone: Zone.Battle,
            isYours: true,
          }).map((value) => (
            <SingleGameCard data={value} />
          ))}
        </StyledCol>

        {/** your morgue zone */}
        <StyledCol lg={2} xs={2}>
          {yourMorgueGameCards.length > 0 && (
            <GameCardStack data={yourMorgueGameCards} />
          )}
        </StyledCol>
      </StyledRow>

      <StyledRow marginTop={5}>
        {/** your soul zone */}
        <StyledCol lg={10} xs={10}>
          {findGameCards(gameCards, user, {
            zone: Zone.Soul,
            isYours: true,
          }).map((value) => (
            <SingleGameCard data={value} />
          ))}
        </StyledCol>

        {/** your deck zone */}
        <StyledCol lg={2} xs={2}>
          {yourDeckGameCards.length > 0 && (
            <GameCardStack data={yourDeckGameCards} />
          )}
        </StyledCol>
      </StyledRow>

      <StyledRow marginTop={5}>
        {/** your hand zone */}
        <StyledCol lg={12}>
          {findGameCards(gameCards, user, {
            zone: Zone.Hand,
            isYours: true,
          }).map((value) => (
            <SingleGameCard data={value} />
          ))}
        </StyledCol>
      </StyledRow>

      <Row marginTop={5}>
        <GameUser isYours={true} />
      </Row>
    </Container>
  );
}
