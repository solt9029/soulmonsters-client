import React, { useContext } from 'react';
import { useActiveGameIdQuery } from '../graphql/generated/graphql-client';
import { AppContext } from '../components/App';
import { Container } from '../styled/reactstrap';
import StartGame from '../components/game/StartGame';
import GameCardArea from '../components/game/GameCardArea';
import SplitterLayout from 'react-splitter-layout';
import 'react-splitter-layout/lib/index.css';
import './Game.css';

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
      {activeGameIdQueryResult.loading && (
        <Container marginTop={12}>ゲーム情報をロード中です</Container>
      )}
      {activeGameIdQueryResult.error !== undefined && (
        <Container marginTop={12}>
          ゲーム情報の取得中にエラーが発生しました
        </Container>
      )}
      {activeGameIdQueryResult.data?.activeGameId === null && (
        <Container marginTop={12}>
          <StartGame />
        </Container>
      )}
      {activeGameIdQueryResult.data?.activeGameId !== null && (
        <SplitterLayout secondaryInitialSize={20} percentage>
          <GameCardArea />
          <div>pane2</div>
        </SplitterLayout>
      )}
    </>
  );
}
