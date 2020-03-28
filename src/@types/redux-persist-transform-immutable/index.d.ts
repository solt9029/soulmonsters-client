declare module 'redux-persist-transform-immutable' {
  import { Refs } from 'remotedev-serialize';
  import { Transform } from 'redux-persist';

  interface Config {
    whitelist?: Array<string>;
    blacklist?: Array<string>;
    records?: Refs;
  }

  export default function (
    config: Config
  ): Transform<(input: any) => string, (input: string) => any, any, any>;
}
