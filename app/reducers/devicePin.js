import { FETCH_STATE, SET_PIN } from '../actions/seedGeneration';

const INITIAL_STATE : State = {
 pin_set  : false
}

export default function(state = INITIAL_STATE, action: Action) : State {
  const { type, payload } = action

  switch (type) {
    case SET_PIN: {
      console.log("Pin has been set", payload);
      const pin_set = payload;
      return { ...state, pin_set};
    }

    case FETCH_STATE: {
      console.log("Reducer state", state);
      return { ...state};
    }

    default:
      return state
  }
}
