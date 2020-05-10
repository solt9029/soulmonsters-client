import React from 'react';
import DeckArea from '../components/DeckArea';
import CardArea from '../components/CardArea';
import AreaWrapper from '../styled/AreaWrapper';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';

export default function Deck() {
  return (
    <DndProvider backend={Backend}>
      <AreaWrapper>
        <DeckArea />
        <CardArea />
      </AreaWrapper>
    </DndProvider>
  );
}
