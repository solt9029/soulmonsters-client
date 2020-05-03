import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Navbar from '../containers/Navbar';
import Help from '../pages/Help';
import Rule from '../pages/Rule';
import NotFound from '../pages/NotFound';
import Index from '../pages/Index';

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
      <Switch>
        <Route exact path="/" component={Index} />
        <Route exact path="/help" component={Help} />
        <Route exact path="/rule" component={Rule} />
        <Route component={NotFound} />
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
