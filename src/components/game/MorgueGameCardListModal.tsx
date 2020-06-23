import React, { useContext } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ListGroup,
  ListGroupItem,
} from 'reactstrap';
import { AppContext } from '../App';
import styled from 'styled-components';
import { Row, Col } from '../../styled/reactstrap';
import GameActionButton from './GameActionButton';
import { BACK_SIDE_CARD } from '../../constants/pictures';

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
      <ModalHeader toggle={closeModal}>
        モルグゾーン情報（{morgueGameCardListModal.data.length}枚）
      </ModalHeader>
      <ModalBody>
        <ListGroup>
          {morgueGameCardListModal.data.map((gameCard) => (
            <ListGroupItem>
              <Row>
                <Col lg={3} xs={3}>
                  <Img src={gameCard.card?.picture || BACK_SIDE_CARD} />
                </Col>
                <Col lg={9} xs={9}>
                  <h5>{gameCard.name}</h5>
                  {gameCard.actionTypes.map((type) => (
                    <GameActionButton type={type} gameCard={gameCard} />
                  ))}
                </Col>
              </Row>
            </ListGroupItem>
          ))}
        </ListGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={closeModal}>
          戻る
        </Button>
      </ModalFooter>
    </Modal>
  );
}
