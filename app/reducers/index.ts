// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
// import reducers and their typings :
import helloWorldReducer from './helloWorld';
import { State as HelloWorldState } from './HelloWorld/types';
// import counter from './counter';

export interface RootState {
  readonly helloWorld: HelloWorldState
}

export default function createRootReducer(history: History) {
  return combineReducers<RootState>({
    router: connectRouter(history),
    helloWorld: helloWorldReducer
    // counter
  });
}
