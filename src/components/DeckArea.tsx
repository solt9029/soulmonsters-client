import React, { ChangeEvent, Fragment, useContext } from 'react';
import { Col, FormGroup, Input, Row, Container, Alert } from 'reactstrap';
import {
  useDecksQuery,
  useDeckCardsLazyQuery,
} from '../graphql/generated/graphql-client';
import Card from './Card';
import Area from '../styled/Area';
import { useDrop } from 'react-dnd';
import * as ItemTypes from '../constants/item-types';
import * as AreaTypes from '../constants/area-types';
import { AppContext } from './App';
import * as ErrorMessages from '../constants/error-messages';
import CreateDeckInput from './CreateDeckInput';

export default function DeckArea() {
  const {
    selectedDeckId,
    setSelectedDeckId,
    plusDeckCardError,
    minusDeckCardError,
    createDeckError,
  } = useContext(AppContext);

  const [fetchDeckCards, deckCardsQueryResult] = useDeckCardsLazyQuery();

  const decksQueryResult = useDecksQuery({
    onCompleted: (data) => {
      if (
        selectedDeckId !== null &&
        data.decks.findIndex((deck) => deck.id === selectedDeckId) >= 0
      ) {
        fetchDeckCards({ variables: { deckId: selectedDeckId } });
      }
    },
  });

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: () => ({ type: AreaTypes.DECK }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const handleDeckSelectChange = (event: ChangeEvent<HTMLInputElement>) => {
    fetchDeckCards({ variables: { deckId: event.target.value } });
    setSelectedDeckId(event.target.value);
  };

  return (
    <Area ref={drop} isActive={canDrop && isOver}>
      <Container style={{ marginTop: '12px' }}>
        {decksQueryResult.error !== undefined && (
          <Alert color="danger">デッキ情報の取得中にエラーが発生しました</Alert>
        )}
        {createDeckError !== null && (
          <Alert color="danger">デッキ情報の作成中にエラーが発生しました</Alert>
        )}
        <CreateDeckInput />
        <FormGroup row>
          <Col sm={12}>
            <Input
              type="select"
              onChange={handleDeckSelectChange}
              value={selectedDeckId || undefined}
            >
              <option value="default">編集するデッキを選択してください</option>
              {decksQueryResult.data?.decks?.map((deck) => (
                <option key={deck.id} value={deck.id}>
                  {deck.name}
                </option>
              ))}
            </Input>
          </Col>
        </FormGroup>
        <Row style={{ color: 'white' }}>
          {deckCardsQueryResult.error !== undefined && (
            <Col lg={12}>
              <Alert color="danger">
                デッキのカード情報の取得中にエラーが発生しました
              </Alert>
            </Col>
          )}

          {plusDeckCardError !== null &&
            plusDeckCardError.message === ErrorMessages.MAX_COUNT && (
              <Col lg={12}>
                <Alert color="danger">
                  同名カードはデッキに3枚までしか入れることができません
                </Alert>
              </Col>
            )}

          {plusDeckCardError !== null &&
            plusDeckCardError.message !== ErrorMessages.MAX_COUNT && (
              <Col lg={12}>
                <Alert color="danger">
                  デッキへカードを追加する途中にエラーが発生しました
                </Alert>
              </Col>
            )}

          {minusDeckCardError !== null && (
            <Col lg={12}>
              <Alert color="danger">
                デッキからカードを抜く途中にエラーが発生しました
              </Alert>
            </Col>
          )}

          {deckCardsQueryResult.loading && (
            <Col style={{ marginBottom: '12px' }} lg={12}>
              デッキのカード情報をロード中です
            </Col>
          )}

          {deckCardsQueryResult.data?.deckCards.map((deckCard, index) => {
            return (
              <Fragment>
                {[...Array(deckCard.count)].map(() => (
                  <Card
                    id={deckCard.card.id}
                    isInDeck
                    picture={deckCard.card.picture}
                  ></Card>
                ))}
              </Fragment>
            );
          })}
        </Row>
      </Container>
    </Area>
  );
}
