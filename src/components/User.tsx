import React from 'react';
import { UserInterface } from '../models/User';

interface Props {
  startLogin: () => void;
  user: UserInterface;
}

export default function User(props: Props) {
  if (props.user.isLoading) {
    return <div>is loading</div>;
  }
  if (props.user.error !== null) {
    return <div>error is not null</div>;
  }
  if (props.user.data !== null) {
    return <div>data is not null</div>;
  }
  return <button onClick={props.startLogin}>login</button>;
}
