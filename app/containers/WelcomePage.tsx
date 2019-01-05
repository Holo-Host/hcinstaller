import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Welcome from '../components/Welcome';
import * as HomeActions from '../actions/home';

type Props = {
  rust: {
    rustup_version: string,
    cargo_version: string,
  },
  zmq_version: string,
  hc_rust_version: string,
  container_installed: boolean,
  update_rustup_version: (payload) => void,
  update_cargo_version: (payload) => void
};

class WelcomePage extends Component<Props> {
  props: Props;

  render() {
    return <Welcome />;
  }
}

function mapStateToProps({rustup_version, cargo_version}) {
  return {
    rust: { rustup:rustup_version, cargo:cargo_version }
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(HomeActions, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(WelcomePage);
