export const UPDATE_RUSTUP_VERSION = 'UPDATE_RUSTUP_VERSION';
export const UPDATE_CARGO_VERSION = 'UPDATE_CARGO_VERSION';
export const UPDATE_ZMQ_VERSION = 'UPDATE_ZMQ_VERSION'
export const UPDATE_HC_RUST_VERSION = 'UPDATE_HC_RUST_VERSION';
export const FETCH_STATE = 'FETCH_STATE';

export function update_rustup_version(payload) {
  console.log("ACTIONS >> New Rustup Version: ", payload);
  return {
    type: UPDATE_RUSTUP_VERSION,
    payload
  };
}

export function update_cargo_version(payload) {
  console.log("ACTIONS >> New Cargo Version: ", payload);
  return {
    type: UPDATE_CARGO_VERSION,
    payload
  };
}

export function update_zmq_version(payload) {
  console.log("ACTIONS >> New libZMQ Version: ", payload);
  return {
    type: UPDATE_ZMQ_VERSION,
    payload
  };
}

export function update_hc_rust_version(payload) {
  console.log("ACTIONS >> New HC Rust Version: ", payload);
  return {
    type: UPDATE_HC_RUST_VERSION,
    payload
  };
}

export function fetch_state() {
  return {
    type: FETCH_STATE
  };
}
