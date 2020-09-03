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

export enum ActionStatusType {
  SELECT_ATTACK_TARGET,
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

  addPayload(data: { key: keyof ActionPayload; id: number }) {
    return this.set('payload', {
      ...this.payload,
      [data.key]: [...(this.payload[data.key] || []), data.id],
    }).updateStep();
  }

  private updateStep(): ActionStatus {
    const { type, payload, step } = this;

    if (type === ActionType.Attack) {
      if (step === 0) {
        const { targetGameCardIds, targetGameUserIds } = payload;
        if (
          targetGameCardIds?.length === 1 ||
          targetGameUserIds?.length === 1
        ) {
          return this.set('step', step + 1);
        }
      }
    }

    return this;
  }

  // TODO: put this directly to step
  // this returns what your user has to do now
  getType() {
    if (this.type === ActionType.Attack && this.step === 0) {
      return ActionStatusType.SELECT_ATTACK_TARGET;
    }
    return null;
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

    if (ActionType.Attack === this.type && this.step === 1) {
      return true;
    }

    return false;
  }
}
