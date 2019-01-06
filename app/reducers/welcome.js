import { FETCH_STATE } from '../actions/welcome';

const INITIAL_STATE : State = {
 welcome_page_state  : []
}

export default function(state = INITIAL_STATE, action: Action) : State {
  const { type, payload } = action

  switch (type) {

    case FETCH_STATE: {
      console.log("Reducer state", state);
      return { ...state};
    }

    default:
      return state
  }
}
