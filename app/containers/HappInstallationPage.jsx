import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import HappInstallation from '../components/HappInstallation';
import * as HappInstallationActions from '../actions/happInstallation';


type Props = {
  install_happs: (payload) => void,
  fetch_state: () => void,
  update_core_apps: (payload) => void,
  coreHapps: array
};

class HappInstallationPage extends Component<Props> {
  constructor(props:Props){
    super(props);
  };

  render() {
    // props={this.props}
    return <HappInstallation
    {...this.props}
    coreHapps={this.props.coreHapps} />;
  }
}

function mapStateToProps({happInstallationReducer}) {
  return {
    coreHapps: happInstallationReducer.coreHapps
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(InstallationActions, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(HappInstallationPage);
