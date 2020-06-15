import {
  Zone,
  Maybe,
  Card,
  GameCard,
  GameUser,
  User as GraphQLUser,
} from './../graphql/generated/graphql-client';
import UserModel from '../models/User';

type GameCards = Array<
  { __typename?: 'GameCard' } & Pick<
    GameCard,
    | 'id'
    | 'originalUserId'
    | 'currentUserId'
    | 'zone'
    | 'position'
    | 'battlePosition'
    | 'name'
    | 'kind'
    | 'type'
    | 'attribute'
    | 'attack'
    | 'defence'
    | 'cost'
    | 'detail'
  > & { card?: Maybe<{ __typename?: 'Card' } & Pick<Card, 'id' | 'picture'>> }
>;

type GameUsers = Array<
  { __typename?: 'GameUser' } & Pick<
    GameUser,
    'id' | 'userId' | 'energy' | 'lifePoint' | 'lastViewedAt' | 'actions'
  > & {
      user: { __typename?: 'User' } & Pick<
        GraphQLUser,
        'displayName' | 'photoURL'
      >;
    }
>;

export const findGameUser = (
  gameUsers: GameUsers | undefined | null,
  user: UserModel,
  options: { isYours: boolean }
) => {
  return gameUsers?.find(
    (value) =>
      (options.isYours && value.userId === user.data?.uid) ||
      (!options.isYours && value.userId !== user.data?.uid)
  );
};

export const findGameCards = (
  gameCards: GameCards | undefined | null,
  user: UserModel,
  options: { zone: Zone; isYours: boolean }
) => {
  if (!gameCards) {
    return [];
  }
  return gameCards
    .filter(
      (value) =>
        value.zone === options.zone &&
        ((options.isYours && value.currentUserId === user.data?.uid) ||
          (!options.isYours && value.currentUserId !== user.data?.uid))
    )
    .sort((a, b) => b.position - a.position);
};

export const findTopGameCard = (
  gameCards: GameCards | undefined | null,
  user: UserModel,
  options: { zone: Zone; isYours: boolean }
) => {
  return findGameCards(gameCards, user, options).reduce<any>(
    (a, b) => (a.position > b.position ? a : b),
    null
  );
};
