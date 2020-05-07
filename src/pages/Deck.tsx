import React from 'react';
import DeckArea from '../containers/DeckArea';
import CardArea from '../components/CardArea';
import AreaWrapper from '../styled/AreaWrapper';

export default function Deck() {
  return (
    <AreaWrapper>
      <DeckArea />
      <CardArea />
    </AreaWrapper>
  );
}
