import React, { useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import { Col, FormGroup, Input, Button, UncontrolledAlert } from 'reactstrap';
import {
  useDecksQuery,
  useCreateDeckMutation,
  DecksDocument,
  useDeckCardsLazyQuery,
} from '../graphql/generated/graphql-client';

const StyledButton = styled(Button)`
  width: 100%;
`;

interface Props {
  setSelectedDeckId: (selectedDeckId: string | null) => void;
  selectedDeckId: string | null;
}

export default function DeckForm({ selectedDeckId, setSelectedDeckId }: Props) {
  const [fetchDeckCards, deckCardsQueryResult] = useDeckCardsLazyQuery();

  const decksQueryResult = useDecksQuery({
    onCompleted: (data) => {},
  });

  const [createDeck, createDeckResult] = useCreateDeckMutation({
    refetchQueries: [{ query: DecksDocument }],
    onError: () => {},
  });

  const [deckNameInput, setDeckNameInput] = useState('');

  const handleDeckNameInputChange = (event: ChangeEvent<HTMLInputElement>) =>
    setDeckNameInput(event.target.value);

  const handleDeckSelectChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (typeof event.target.value === 'string') {
      setSelectedDeckId(event.target.value);
      return;
    }
    setSelectedDeckId(null);
  };

  const handleClick = () => {
    createDeck({ variables: { name: deckNameInput } });
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
            onChange={handleDeckNameInputChange}
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
            onChange={handleDeckSelectChange}
            value={selectedDeckId || undefined}
          >
            <option value={0}>編集するデッキを選択してください</option>
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
