import React, { useContext } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { AppContext } from '../App';
import {
  DeckCardsDocument,
  usePlusDeckCardMutation,
  useMinusDeckCardMutation,
} from '../../graphql/generated/graphql-client';
import styled from 'styled-components';

const Img = styled.img`
  width: 100%;
`;

export default function DeckModal() {
  const {
    deckModal,
    setDeckModal,
    selectedDeckId,
    setPlusDeckCardError,
    setMinusDeckCardError,
  } = useContext(AppContext);

  const refetchDeckCardsQuery = {
    query: DeckCardsDocument,
    variables: { deckId: selectedDeckId },
  };

  const [plusDeckCard] = usePlusDeckCardMutation({
    refetchQueries: [refetchDeckCardsQuery],
    onCompleted: () => {
      setPlusDeckCardError(null);
    },
    onError: (error) => {
      setPlusDeckCardError(error);
    },
  });

  const [minusDeckCard] = useMinusDeckCardMutation({
    refetchQueries: [refetchDeckCardsQuery],
    onCompleted: () => {
      setMinusDeckCardError(null);
    },
    onError: (error) => {
      setMinusDeckCardError(error);
    },
  });

  const closeModal = () => {
    setDeckModal(null);
  };

  const handleClick = () => {
    if (deckModal !== null && selectedDeckId !== null) {
      const options = {
        variables: { deckId: selectedDeckId, cardId: deckModal.cardId },
      };
      if (deckModal.isInDeck) {
        minusDeckCard(options);
      } else {
        plusDeckCard(options);
      }
    }
    closeModal();
  };

  return (
    <Modal isOpen={deckModal !== null} toggle={closeModal}>
      <ModalHeader toggle={closeModal}>カード詳細情報</ModalHeader>
      <ModalBody>
        <Img alt="modal" src={deckModal?.picture} />
      </ModalBody>
      <ModalFooter>
        {deckModal?.isInDeck ? (
          <Button onClick={handleClick} color="danger">
            このカードをデッキから抜く
          </Button>
        ) : (
          <Button onClick={handleClick} color="success">
            このカードをデッキへ追加する
          </Button>
        )}
        <Button color="secondary" onClick={closeModal}>
          戻る
        </Button>
      </ModalFooter>
    </Modal>
  );
}
