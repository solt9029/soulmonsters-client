import React, { useContext } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { AppContext } from '../App';
import styled from 'styled-components';
import { Row, Col } from '../../styled/reactstrap';
import gameActionNames from '../../constants/game-action-names';
import {
  useActiveGameIdQuery,
  useDispatchGameActionMutation,
  GameDocument,
  ActionType,
} from '../../graphql/generated/graphql-client';

const Img = styled.img`
  width: 100%;
`;

const StyledButton = styled(Button)`
  width: 100%;
  & + & {
    margin-left: 10px;
  }
`;

export default function SingleGameCardModal() {
  const {
    state: { singleGameCardModal, actionStatus },
    dispatch,
  } = useContext(AppContext);

  const activeGameIdQueryResult = useActiveGameIdQuery();
  const activeGameId = activeGameIdQueryResult.data?.activeGameId || 1;

  const [dispatchGameAction] = useDispatchGameActionMutation({
    refetchQueries: [{ query: GameDocument, variables: { id: activeGameId } }],
    onCompleted: () => {},
    onError: (error) => {},
  });

  const closeModal = () => {
    dispatch({
      type: 'SET_SINGLE_GAME_CARD_MODAL',
      payload: singleGameCardModal.close(),
    });
  };

  const handleActionClick = (value: ActionType) => {
    const newActionStatus = actionStatus.start({ type: value });
    if (newActionStatus.isCompleted()) {
      dispatchGameAction({
        variables: { id: activeGameId, data: { type: value } },
      });
      return;
    }
    dispatch({
      type: 'SET_ACTION_STATUS',
      payload: newActionStatus,
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
              <StyledButton
                color="primary"
                onClick={() => {
                  handleActionClick(value);
                }}
              >
                {gameActionNames[value]}
              </StyledButton>
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
