import type { Dispatch as ReduxDispatch, Store as ReduxStore } from 'redux';

export type Dispatch = ReduxDispatch<Action>;
export type Store = ReduxStore<GetState, Action>;

export enum ActionTypes {
  SAY_HELLO = 'SAY_HELLO',
  RECEIVED_HELLO = 'RECEIVED_HELLO'
}

export type Action = {
  readonly type: ActionTypes
  readonly payload: {
    readonly message: string
  }
}
export type GlobalState = {
  +counter: number
  readonly message: string
}

export type GetState = () => State;

// for the helloWorld component
export interface IHelloWorldService {
  sayHelloToMainProcess: () => Promise<any>
}

// for the counter component
// export type counterStateType = {
//   +counter: number
// };
