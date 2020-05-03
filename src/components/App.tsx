import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import User from '../containers/User';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Navbar from '../containers/Navbar';

const GET_CARDS = gql`
  query {
    cards {
      id
      name
    }
  }
`;

interface Props {
  initializeUser: Function;
}

export default function App(props: Props) {
  // componentDidMount
  useEffect(() => {
    props.initializeUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="App">
      <Navbar />
      <User />
      <Switch>
        <Route exact path="/" component={() => <div>index</div>} />
        <Route exact path="/hello" component={() => <div>hello</div>} />
        <Route component={() => <div>notfound</div>} />
      </Switch>
      <Query query={GET_CARDS} pollInterval={10000}>
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
