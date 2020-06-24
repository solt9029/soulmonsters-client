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
import { findGameCards } from '../../utils/game';
import SingleGameCard from './GameCard';
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

  const gameCards = data?.game.gameCards;
  const gameUsers = data?.game.gameUsers;

  return (
    <Container marginTop={20} marginBottom={20}>
      <Row>
        <GameUser gameUsers={gameUsers} isYours={false} />
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
          <GameCardStack
            gameCards={gameCards}
            isYours={false}
            zone={Zone.Deck}
          />
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
          <GameCardStack
            gameCards={gameCards}
            isYours={false}
            zone={Zone.Morgue}
          />
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
          <GameCardStack
            gameCards={gameCards}
            isYours={true}
            zone={Zone.Morgue}
          />
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
          <GameCardStack
            gameCards={gameCards}
            isYours={true}
            zone={Zone.Deck}
          />
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
        <GameUser gameUsers={gameUsers} isYours={true} />
      </Row>
    </Container>
  );
}
