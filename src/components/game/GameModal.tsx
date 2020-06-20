import React, { useContext } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { AppContext } from '../App';
import styled from 'styled-components';

const Img = styled.img`
  width: 100%;
`;

export default function GameModal() {
  const {
    state: { gameModal },
    dispatch,
  } = useContext(AppContext);

  const closeModal = () => {
    dispatch({ type: 'SET_GAME_MODAL', payload: gameModal.close() });
  };

  return (
    <Modal isOpen={gameModal.isOpen} toggle={closeModal}>
      <ModalHeader toggle={closeModal}>カード詳細情報</ModalHeader>
      <ModalBody>
        <Img alt="modal" src={gameModal.data?.card?.picture} />
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={closeModal}>
          戻る
        </Button>
      </ModalFooter>
    </Modal>
  );
}
