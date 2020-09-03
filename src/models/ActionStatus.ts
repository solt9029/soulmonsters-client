import { InitialActionStep } from './../constants/initial-action-steps';
import {
  ActionType,
  ActionPayload,
  GameCardFragment,
} from './../graphql/generated/graphql-client';
import { Record } from 'immutable';
import { ActionStep } from '../constants/action-steps';

export interface ActionStatusInterface {
  type: ActionType | null;
  gameCard?: GameCardFragment;
  payload: ActionPayload;
  step: ActionStep | null;
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
    step: null,
  },
  'ActionStatus'
) {
  start(data: { type: ActionType; gameCard?: GameCardFragment }): ActionStatus {
    return new ActionStatus({ ...data, step: InitialActionStep[data.type] });
  }

  addPayload(data: { key: keyof ActionPayload; id: number }) {
    return this.set('payload', {
      ...this.payload,
      [data.key]: [...(this.payload[data.key] || []), data.id],
    }).updateStep();
  }

  private updateStep(): ActionStatus {
    const { type, payload, step } = this;

    if (type === ActionType.Attack) {
      if (step === ActionStep.SELECT_ATTACK_TARGET) {
        const { targetGameCardIds, targetGameUserIds } = payload;
        if (
          targetGameCardIds?.length === 1 ||
          targetGameUserIds?.length === 1
        ) {
          return this.set('step', ActionStep.COMPLETED);
        }
      }
    }

    return this;
  }

  isStarted() {
    return this.type !== null;
  }

  isCompleted() {
    return this.step === ActionStep.COMPLETED;
  }
}
