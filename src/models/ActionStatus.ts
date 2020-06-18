import {
  ActionType,
  ActionPayload,
} from './../graphql/generated/graphql-client';
import { Record } from 'immutable';

export interface ActionStatusInterface {
  type: ActionType | null;
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
  start(data: ActionType): ActionStatus {
    return new ActionStatus({ type: data });
  }
}
