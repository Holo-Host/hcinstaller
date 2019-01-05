export const UPDATE_RUSTUP_VERSION = 'UPDATE_RUSTUP_VERSION';
export const UPDATE_CARGO_VERSION = 'UPDATE_CARGO_VERSION';

export function update_rustup_version(payload) {
  console.log("New Rustup Version: ", payload);
  return {
    type: UPDATE_RUSTUP_VERSION,
    payload
  };
}

export function update_cargo_version(payload) {
  console.log("New Cargo Version: ", payload);
  return {
    type: UPDATE_CARGO_VERSION,
    payload
  };
}
