import React, { useState } from 'react';
import styled from 'styled-components';
import { Container, Row, Col, FormGroup, Input, Button } from 'reactstrap';
import Card from '../components/Card';
import {
  useCardsQuery,
  useDecksQuery,
  useCreateDeckMutation,
  DecksDocument,
} from '../graphql/generated/graphql-client';

const Zone = styled.div<{ isLeft: boolean }>`
  height: 100vh;
  width: 100%;
  background-size: cover;
  background-color: #222;
  border: solid 5px #ccc;
  border-left-width: ${(props) => (props.isLeft ? '5px' : '0px')};
  border-collapse: collapse;
`;

const StyledContainer = styled(Container)`
  margin-top: 12px;
`;

const StyledRow = styled(Row)`
  color: white;
`;

const StyledCol = styled(Col)`
  margin-bottom: 12px;
  padding-right: 6px;
  padding-left: 6px;
`;

export default function Deck() {
  const { data, error, loading } = useCardsQuery();
  const decksQuery = useDecksQuery();
  const [createDeck] = useCreateDeckMutation({
    refetchQueries: [{ query: DecksDocument }],
  });

  const [deckName, setDeckName] = useState('');

  return (
    <div style={{ display: 'flex', backgroundColor: '#222' }}>
      <Zone isLeft={true}>
        <StyledContainer>
          <FormGroup row>
            <Col sm={10}>
              <Input
                type="text"
                id="deck"
                placeholder="デッキ名"
                value={deckName}
                onChange={(event) => setDeckName(event.target.value)}
              />
            </Col>
            <Col sm={2}>
              <Button
                color="success"
                style={{ width: '100%' }}
                onClick={() => createDeck({ variables: { name: deckName } })}
              >
                作成
              </Button>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col sm={12}>
              <Input type="select">
                {decksQuery.data?.decks?.map((deck) => (
                  <option>{deck.name}</option>
                ))}
              </Input>
            </Col>
          </FormGroup>
        </StyledContainer>
      </Zone>

      <Zone isLeft={false}>
        <StyledContainer>
          <StyledRow>
            {loading && <StyledCol lg={12}>カード情報をロード中です</StyledCol>}
            {error !== undefined && (
              <StyledCol lg={12}>
                カード情報の取得中にエラーが発生しました
              </StyledCol>
            )}
            {data?.cards.map((card, index) => (
              <Card key={index} imageUrl={card.picture}></Card>
            ))}
          </StyledRow>
        </StyledContainer>
      </Zone>
    </div>
  );
}
