import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Welcome from '../components/Welcome';
import * as WelcomeActions from '../actions/welcome';

type Props = {
  fetch_state: () => void
};

class WelcomePage extends Component<Props> {
  constructor(props:Props){
    super(props);
  };

  render() {
    return <Welcome />;
  }
}

function mapStateToProps({welcomeReducer}) {
  return {welcome: welcomeReducer};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(WelcomeActions, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(WelcomePage);
