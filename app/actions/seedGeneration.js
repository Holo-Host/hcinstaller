export const FETCH_STATE = 'FETCH_STATE';
export const SET_PIN = 'SET_PIN';

export function set_pin(payload) {
  console.log("set_pin: ", payload);
  return {
    type: SET_PIN,
    payload
  };
}

export function fetch_state() {
  return {
    type: FETCH_STATE
  };
}
