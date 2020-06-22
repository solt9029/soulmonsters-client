import React, { useContext } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { AppContext } from '../App';
import styled from 'styled-components';
import { Row, Col } from '../../styled/reactstrap';
import GameActionButton from './GameActionButton';

const Img = styled.img`
  width: 100%;
`;

export default function SingleGameCardModal() {
  const {
    state: { singleGameCardModal },
    dispatch,
  } = useContext(AppContext);

  const closeModal = () => {
    dispatch({
      type: 'SET_SINGLE_GAME_CARD_MODAL',
      payload: singleGameCardModal.close(),
    });
  };

  return (
    <Modal isOpen={singleGameCardModal.isOpen} toggle={closeModal}>
      <ModalHeader toggle={closeModal}>カード詳細情報</ModalHeader>
      <ModalBody>
        <Row>
          <Col lg={6} xs={6}>
            <Img alt="modal" src={singleGameCardModal.data?.card?.picture} />
          </Col>
          <Col lg={6} xs={6}>
            {singleGameCardModal.data?.actionTypes.map((value) => (
              <GameActionButton
                type={value}
                gameCard={singleGameCardModal?.data}
              />
            ))}
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={closeModal}>
          戻る
        </Button>
      </ModalFooter>
    </Modal>
  );
}
