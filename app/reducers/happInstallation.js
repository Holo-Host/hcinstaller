import {
    UPDATE_CORE_HAPPS,
    INSTALL_HAPPS,
    FETCH_STATE
  } from '../actions/welcome';
  
  const defaultState  = {
    coreHapps: [{}],
  };
  
  export default function stats (oldState = defaultState, action) {
    const state = {
      ...oldState
    };
  
    const {type, payload} = action;
    switch (type) {
      case UPDATE_CORE_HAPPS : {
        console.log("HC_RUST_version", payload);
        const hcoreHapps = payload;
        return { ...state, coreHapps};
      }

      case INSTALL_HAPPS: {
        console.log("hApp Reducer state", state);
        return { ...state};
      }
  
      case FETCH_STATE: {
        console.log("hApp Reducer state", state);
        return { ...state};
      }
  
      default:{
        console.log("default state", state);
        return state}
      }
    }
  