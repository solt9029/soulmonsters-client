import React, { useContext } from 'react';

import { useActiveGameIdQuery } from '../graphql/generated/graphql-client';
import { AppContext } from '../components/App';

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
      {activeGameIdQueryResult.loading && <div>ロード中</div>}
      {activeGameIdQueryResult.error !== undefined && (
        <div>エラーが発生しました</div>
      )}
      {activeGameIdQueryResult.data?.activeGameId === null && (
        <div>スタートゲーム！</div>
      )}
      {activeGameIdQueryResult.data?.activeGameId !== null && (
        <div>ゲームの様子を描画するよ</div>
      )}
    </>
  );
}
