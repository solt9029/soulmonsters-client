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
  step: ActionStep | null;
}

export enum ActionStep {
  SELECT_ATTACK_TARGET,
  COMPLETED,
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
    let step: ActionStep | null = null;
    if (data.type === ActionType.Attack) {
      step = ActionStep.SELECT_ATTACK_TARGET;
    }

    return new ActionStatus({ ...data, step });
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
    if (
      Array<ActionType | null>(
        ActionType.StartDrawTime,
        ActionType.StartEnergyTime,
        ActionType.StartPutTime,
        ActionType.PutSoul,
        ActionType.StartSomethingTime,
        ActionType.SummonMonster,
        ActionType.StartBattleTime
      ).includes(this.type)
    ) {
      return true;
    }

    if (this.step === ActionStep.COMPLETED) {
      return true;
    }

    return false;
  }
}
