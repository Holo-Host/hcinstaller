import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SeedGeneration from '../components/SeedGeneration';
import * as SeedGenerationActions from '../actions/seedGeneration';

type Props = {
  pin_set: boolean,
  set_pin: (payload) => void,
  fetch_state: () => void
};

class SeedGenerationPage extends Component<Props> {
  constructor(props:Props){
    super(props);
  };

  render() {
    return <SeedGeneration />;
  }
}

function mapStateToProps({seedGenerationReducer}) {
  return {pin_set: seedGenerationReducer.pin_set};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(SeedGenerationActions, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(SeedGenerationPage);
