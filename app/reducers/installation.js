import {
  UPDATE_CARGO_VERSION,
  UPDATE_RUSTUP_VERSION,
  UPDATE_ZMQ_VERSION,
  UPDATE_HC_RUST_VERSION,
  FETCH_STATE
} from '../actions/welcome';

const defaultState  = {
  rustup_version: "none",
  cargo_version: "none",
  zmq_version: "none",
  hc_rust_version: "none",
};

export default function stats (oldState = defaultState, action) {
  const state = {
    ...oldState
  };

  const {type, payload} = action;
  switch (type) {
    case UPDATE_CARGO_VERSION: {
      console.log("cargo_version", payload);
      const cargo_version = payload;
      return { ...state, cargo_version};
    }

    case UPDATE_RUSTUP_VERSION: {
      console.log("rustup_version", payload);
      const rustup_version = payload;
      return { ...state, rustup_version};
    }

    case UPDATE_ZMQ_VERSION: {
      console.log("libzmq_version", payload);
      const zmq_version = payload;
      return { ...state, zmq_version};
    }

    case UPDATE_HC_RUST_VERSION: {
      console.log("HC_RUST_version", payload);
      const hc_rust_version = payload;
      return { ...state, hc_rust_version};
    }

    case FETCH_STATE: {
      console.log("Reducer state", state);
      return { ...state};
    }

    default:{
      console.log("default state", state);
      return state}
    }
  }
