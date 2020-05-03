import React from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Container } from 'reactstrap';

const Zone = styled.div<{ isLeft: boolean }>`
  height: 100vh;
  width: 100%;
  background-size: cover;
  background-color: #222;
  border: solid 5px #ccc;
  border-left-width: ${(props) => (props.isLeft ? '5px' : '0px')};
  border-collapse: collapse;
`;

const GET_CARDS = gql`
  query {
    cards {
      id
      name
    }
  }
`;

export default function Deck() {
  return (
    <div style={{ display: 'flex', backgroundColor: '#222' }}>
      <Zone isLeft={true} />
      <Zone isLeft={false}>
        <Container>
          <Query query={GET_CARDS}>
            {(data: any) => {
              console.log(data);
              if (data.error) {
                return <div>エラーが発生しました</div>;
              }

              if (data.loading) {
                return <div>ロード中</div>;
              }

              return <div style={{ color: 'white' }}>data</div>;
            }}
          </Query>
        </Container>
      </Zone>
    </div>
  );
}
