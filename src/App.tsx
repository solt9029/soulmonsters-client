import React from 'react';
import { Switch, Route } from 'react-router-dom';

export default function App() {
  return (
    <div className="App">
      App
      <Switch>
        <Route exact path="/" component={() => <div>index</div>} />
        <Route exact path="/hello" component={() => <div>hello</div>} />
        <Route component={() => <div>notfound</div>} />
      </Switch>
    </div>
  );
}
