import React, { useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import { Col, FormGroup, Input, Button, UncontrolledAlert } from 'reactstrap';
import {
  useDecksQuery,
  useCreateDeckMutation,
  DecksDocument,
} from '../graphql/generated/graphql-client';

const StyledButton = styled(Button)`
  width: 100%;
`;

export default function DeckForm() {
  const decksQueryResult = useDecksQuery();
  const [createDeck, createDeckResult] = useCreateDeckMutation({
    refetchQueries: [{ query: DecksDocument }],
    onError: () => {},
  });

  const [deckNameInput, setDeckNameInput] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) =>
    setDeckNameInput(event.target.value);

  const handleClick = () => {
    try {
      createDeck({ variables: { name: deckNameInput } });
    } catch (e) {}
    setDeckNameInput('');
  };

  return (
    <div>
      {decksQueryResult.error !== undefined && (
        <UncontrolledAlert color="danger">
          デッキ情報の取得中にエラーが発生しました
        </UncontrolledAlert>
      )}
      {createDeckResult.error !== undefined && (
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
            onChange={handleChange}
          />
        </Col>
        <Col sm={4}>
          <StyledButton color="success" onClick={handleClick}>
            作成
          </StyledButton>
        </Col>
      </FormGroup>
      <FormGroup row>
        <Col sm={12}>
          <Input
            type="select"
            // onChange={(e) => console.log(e.target.value)}
            // value={'ck9v0bi5m0h6e0857oq5txbne'}
          >
            {decksQueryResult.data?.decks?.map((deck) => (
              <option key={deck.id} value={deck.id}>
                {deck.name}
              </option>
            ))}
          </Input>
        </Col>
      </FormGroup>
    </div>
  );
}
