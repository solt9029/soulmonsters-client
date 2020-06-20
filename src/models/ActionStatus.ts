import {
  ActionType,
  ActionPayload,
} from './../graphql/generated/graphql-client';
import { Record } from 'immutable';

export interface ActionStatusInterface {
  type: ActionType | null;
  gameCardId?: number;
  payload: ActionPayload;
  step: number;
}

export default class ActionStatus extends Record<ActionStatusInterface>(
  {
    type: null,
    payload: {
      targetGameCardIds: [],
      costGameCardIds: [],
      targetGameUserIds: [],
    },
    step: 0, // combination of step and type is important
  },
  'ActionStatus'
) {
  start(data: { type: ActionType; gameCardId?: number }): ActionStatus {
    return new ActionStatus(data);
  }
  isCompleted() {
    if (
      this.type === ActionType.StartDrawTime ||
      this.type === ActionType.StartEnergyTime
    ) {
      return true;
    }
    return false;
  }
}
