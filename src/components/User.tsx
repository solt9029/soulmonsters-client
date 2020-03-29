import React from 'react';

interface Props {
  startLogin: () => void;
}

export default function User({ startLogin }: Props) {
  return <button onClick={startLogin}>login</button>;
}
