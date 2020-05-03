import React from 'react';
import { Route, RouteProps, Redirect } from 'react-router-dom';
import { UserInterface } from '../models/User';

interface Props extends RouteProps {
  user: UserInterface;
}

export default function PrivateRoute({ user, ...props }: Props) {
  if (user.data === null) {
    return <Route {...props} component={() => <Redirect to="/" />} />;
  }
  return <Route {...props} />;
}
