import React, { useState, ChangeEvent, Fragment, useContext } from 'react';
import {
  Col,
  FormGroup,
  Input,
  Button,
  Row,
  Container,
  Alert,
} from 'reactstrap';
import {
  useDecksQuery,
  useCreateDeckMutation,
  DecksDocument,
  useDeckCardsLazyQuery,
} from '../graphql/generated/graphql-client';
import Card from './Card';
import Area from '../styled/Area';
import { useDrop } from 'react-dnd';
import * as ItemTypes from '../constants/item-types';
import * as AreaTypes from '../constants/area-types';
import { AppContext } from './App';
import * as ErrorMessages from '../constants/error-messages';

export default function DeckArea() {
  const { selectedDeckId, setSelectedDeckId, plusDeckCardError } = useContext(
    AppContext
  );

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

  const [createDeck, createDeckResult] = useCreateDeckMutation({
    refetchQueries: [{ query: DecksDocument }],
    onError: () => {},
  });

  const [deckNameInput, setDeckNameInput] = useState('');

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: () => ({ type: AreaTypes.DECK }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const handleDeckNameInputChange = (event: ChangeEvent<HTMLInputElement>) =>
    setDeckNameInput(event.target.value);

  const handleDeckSelectChange = (event: ChangeEvent<HTMLInputElement>) => {
    fetchDeckCards({ variables: { deckId: event.target.value } });
    setSelectedDeckId(event.target.value);
  };

  const handleClick = () => {
    createDeck({ variables: { name: deckNameInput } });
    setDeckNameInput('');
  };

  return (
    <Area ref={drop} isActive={canDrop && isOver}>
      <Container style={{ marginTop: '12px' }}>
        {decksQueryResult.error !== undefined && (
          <Alert color="danger">デッキ情報の取得中にエラーが発生しました</Alert>
        )}
        {createDeckResult.error !== undefined && (
          <Alert color="danger">デッキ情報の作成中にエラーが発生しました</Alert>
        )}
        <FormGroup row>
          <Col sm={8}>
            <Input
              type="text"
              id="deck"
              placeholder="デッキ名"
              value={deckNameInput}
              onChange={handleDeckNameInputChange}
            />
          </Col>
          <Col sm={4}>
            <Button
              style={{ width: '100%' }}
              color="success"
              onClick={handleClick}
            >
              作成
            </Button>
          </Col>
        </FormGroup>
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
                  デッキへのカードの追加中にエラーが発生しました
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
