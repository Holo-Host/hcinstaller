export const FETCH_STATE = 'FETCH_STATE';
export const UPDATE_CORE_HAPPS = 'UPDATE_CORE_HAPPS';
export const INSTALL_HAPPS = 'INSTALL_HAPPS';

function fetch_state() {
  return {
    type: FETCH_STATE
  };
}

export function update_core_happs(payload) {
    console.log("ACTIONS >> UPDATE_CORE_HAPPS: ", payload);
    return {
      type: UPDATE_CORE_HAPPS,
      payload
    };
  }

  export function install_happs(payload) {
    console.log("ACTIONS >> INSTALL_HAPPS: ", payload);
    return {
      type: INSTALL_HAPPS,
      payload
    };
  }