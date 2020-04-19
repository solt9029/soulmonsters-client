import React from 'react';
import { Switch, Route } from 'react-router-dom';
import User from './containers/User';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const GET_CARDS = gql`
  query {
    cards {
      id
    }
  }
`;

export function App(props: any) {
  console.log(props);
  return (
    <div className="App">
      <User />
      <Switch>
        <Route exact path="/" component={() => <div>index</div>} />
        <Route exact path="/hello" component={() => <div>hello</div>} />
        <Route component={() => <div>notfound</div>} />
      </Switch>
      <Query query={GET_CARDS}>
        {(data: any) => {
          if (data.error) {
            return <div>error</div>;
          }

          if (data.loading) {
            return <div>loading</div>;
          }

          return <div>data fetched!</div>;
        }}
      </Query>
    </div>
  );
}

export default graphql(GET_CARDS, {
  options: { pollInterval: 1000 },
})(App);
