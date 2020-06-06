import React, { useContext } from 'react';
import { useActiveGameIdQuery } from '../graphql/generated/graphql-client';
import { AppContext } from '../components/App';
import { Container } from '../styled/reactstrap';
import StartGame from '../components/game/StartGame';

export default function Game() {
  const { setActiveGameId } = useContext(AppContext);

  const activeGameIdQueryResult = useActiveGameIdQuery({
    onCompleted: (data) => {
      if (data.activeGameId !== undefined) {
        setActiveGameId(data?.activeGameId);
      }
    },
  });

  return (
    <>
      <Container marginTop={12}>
        {activeGameIdQueryResult.loading && <div>ゲーム情報をロード中です</div>}
        {activeGameIdQueryResult.error !== undefined && (
          <div>ゲーム情報の取得中にエラーが発生しました</div>
        )}
        {activeGameIdQueryResult.data?.activeGameId === null && <StartGame />}
        {activeGameIdQueryResult.data?.activeGameId !== null && (
          <div>ゲームの様子を描画するよ</div>
        )}
      </Container>
    </>
  );
}
