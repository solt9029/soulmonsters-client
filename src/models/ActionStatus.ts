import {
  ActionType,
  ActionPayload,
  GameCardFragment,
} from './../graphql/generated/graphql-client';
import { Record } from 'immutable';

export interface ActionStatusInterface {
  type: ActionType | null;
  gameCard?: GameCardFragment;
  payload: ActionPayload;
  step: number;
}

export default class ActionStatus extends Record<ActionStatusInterface>(
  {
    type: null,
    gameCard: undefined,
    payload: {
      targetGameCardIds: [],
      costGameCardIds: [],
      targetGameUserIds: [],
    },
    step: 0, // combination of step and type is important
  },
  'ActionStatus'
) {
  start(data: { type: ActionType; gameCard?: GameCardFragment }): ActionStatus {
    return new ActionStatus(data);
  }
  isCompleted() {
    if (
      Array<ActionType | null>(
        ActionType.StartDrawTime,
        ActionType.StartEnergyTime,
        ActionType.StartPutTime,
        ActionType.PutSoul
      ).includes(this.type)
    ) {
      return true;
    }
    return false;
  }
}
