import React from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import {
  Container,
  Row,
  Col,
  CardImg,
  Dropdown,
  DropdownItem,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  FormGroup,
  Label,
  Input,
  Form,
  Button,
} from 'reactstrap';
import Card from '../components/Card';
import { useCardsQuery } from '../graphql/generated/graphql-client';

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

  return (
    <div style={{ display: 'flex', backgroundColor: '#222' }}>
      <Zone isLeft={true}>
        <StyledContainer>
          <FormGroup row>
            <Col sm={10}>
              <Input type="text" id="deck" placeholder="デッキ名" />
            </Col>
            <Col sm={2}>
              <Button color="success" style={{ width: '100%' }}>
                作成
              </Button>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col sm={12}>
              <Input type="select">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
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
