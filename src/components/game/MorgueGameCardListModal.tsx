import React, { useContext } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { AppContext } from '../App';
import styled from 'styled-components';
import { Row, Col } from '../../styled/reactstrap';
import GameActionButton from './GameActionButton';

const Img = styled.img`
  width: 100%;
`;

export default function MorgueGameCardListModal() {
  const {
    state: { morgueGameCardListModal },
    dispatch,
  } = useContext(AppContext);

  const closeModal = () => {
    dispatch({
      type: 'SET_MORGUE_GAME_CARD_LIST_MODAL',
      payload: morgueGameCardListModal.close(),
    });
  };

  return (
    <Modal isOpen={morgueGameCardListModal.isOpen} toggle={closeModal}>
      <ModalHeader toggle={closeModal}>MorgueGameCardListModal</ModalHeader>
      <ModalBody></ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={closeModal}>
          戻る
        </Button>
      </ModalFooter>
    </Modal>
  );
}
