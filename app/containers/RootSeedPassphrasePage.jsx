import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import RootSeedPassphrase from '../components/RootSeedPassphrase';
import * as WelcomeActions from '../actions/welcome';

type Props = {
  fetch_state: () => void
};

class RootSeedPassphrasePage extends Component<Props> {
  constructor(props:Props){
    super(props);
  };

  render() {
    return <RootSeedPassphrase />;
  }
}

function mapStateToProps({welcomeReducer}) {
  return {welcome: welcomeReducer};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(WelcomeActions, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(RootSeedPassphrasePage);
