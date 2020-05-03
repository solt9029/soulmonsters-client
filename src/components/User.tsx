import React from 'react';
import { UserInterface } from '../models/User';

interface Props {
  startLogin: () => void;
  startLogout: () => void;
  user: UserInterface;
}

export default function User(props: Props) {
  if (props.user.isLoading) {
    return <div>is loading</div>;
  }
  if (props.user.error !== null) {
    return <div>error</div>;
  }
  if (props.user.data !== null) {
    return (
      <div>
        {props.user.data.uid}
        <button onClick={props.startLogout}>logout</button>
      </div>
    );
  }
  return <button onClick={props.startLogin}>login</button>;
}
