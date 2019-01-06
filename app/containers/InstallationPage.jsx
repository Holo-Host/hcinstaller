import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Installation from '../components/Installation';
import * as InstallationActions from '../actions/installation';

type Props = {
  rust: {
    rustup_version: string,
    cargo_version: string,
  },
  zmq_version: string,
  hc_rust_version: string,
  update_rustup_version: (payload) => void,
  update_cargo_version: (payload) => void,
  fetch_state: () => void
};

class InstallationPage extends Component<Props> {
  constructor(props:Props){
    super(props);
  };

  render() {
    // props={this.props}

    return <Installation
    {...this.props}
    update_rustup_version={this.props.update_rustup_version} />;
  }
}

function mapStateToProps({installationReducer}) {
  return {
    rust: { rustup:installationReducer.rustup_version, cargo:installationReducer.cargo_version },
    zmq_version: installationReducer.zmq_version,
    hc_rust_version: installationReducer.hc_rust_version
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(InstallationActions, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(InstallationPage);
