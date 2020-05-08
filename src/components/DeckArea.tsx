import React, { useState, ChangeEvent, Fragment } from 'react';
import {
  Col,
  FormGroup,
  Input,
  Button,
  UncontrolledAlert,
  Row,
  Container,
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
import { ApolloError } from 'apollo-client';
import { DeckErrorInterface } from '../models/DeckError';

interface Props {
  setSelectedDeckId: (selectedDeckId: string | null) => void;
  setCreateDeckError: (error: ApolloError | null) => void;
  setFetchDeckCardsError: (error: ApolloError | null) => void;
  setFetchDecksError: (error: ApolloError | null) => void;
  selectedDeckId: string | null;
  deckError: DeckErrorInterface;
}

export default function DeckArea(props: Props) {
  const [fetchDeckCards, deckCardsQueryResult] = useDeckCardsLazyQuery({
    onCompleted: () => {
      props.setFetchDeckCardsError(null);
    },
    onError: (error) => {
      props.setFetchDeckCardsError(error);
    },
  });

  const decksQueryResult = useDecksQuery({
    onCompleted: (data) => {
      props.setFetchDecksError(null);
      if (
        props.selectedDeckId !== null &&
        data.decks.findIndex((deck) => deck.id === props.selectedDeckId) >= 0
      ) {
        fetchDeckCards({ variables: { deckId: props.selectedDeckId } });
      }
    },
    onError: (error) => {
      props.setFetchDecksError(error);
    },
  });

  const [createDeck] = useCreateDeckMutation({
    refetchQueries: [{ query: DecksDocument }],
    onCompleted: () => {
      props.setCreateDeckError(null);
    },
    onError: (error) => {
      props.setCreateDeckError(error);
    },
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
    props.setSelectedDeckId(event.target.value);
  };

  const handleClick = () => {
    createDeck({ variables: { name: deckNameInput } });
    setDeckNameInput('');
  };

  return (
    <Area ref={drop} isActive={canDrop && isOver}>
      <Container style={{ marginTop: '12px' }}>
        {props.deckError.fetchDecksError !== null && (
          <UncontrolledAlert color="danger">
            デッキ情報の取得中にエラーが発生しました
          </UncontrolledAlert>
        )}
        {props.deckError.createDeckError !== null && (
          <UncontrolledAlert color="danger">
            デッキ情報の作成中にエラーが発生しました
          </UncontrolledAlert>
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
              value={props.selectedDeckId || undefined}
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
          {deckCardsQueryResult.loading && (
            <Col style={{ marginBottom: '12px' }} lg={12}>
              デッキのカード情報をロード中です
            </Col>
          )}
          {deckCardsQueryResult.error !== undefined && (
            <Col lg={12}>
              <UncontrolledAlert color="danger">
                デッキのカード情報の取得中にエラーが発生しました
              </UncontrolledAlert>
            </Col>
          )}
          {deckCardsQueryResult.data?.deckCards.map((deckCard, index) => {
            return (
              <Fragment>
                {[...Array(deckCard.count)].map(() => (
                  <Card
                    selectedDeckId={props.selectedDeckId}
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
