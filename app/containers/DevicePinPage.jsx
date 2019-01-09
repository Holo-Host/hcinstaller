import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DevicePin from '../components/DevicePin';
import * as DevicePinActions from '../actions/devicePin';

type Props = {
  pin_set: boolean,
  set_pin: (payload) => void,
  fetch_state: () => void
};

class DevicePinPage extends Component<Props> {
  constructor(props:Props){
    super(props);
  };

  render() {
    return <DevicePin />;
  }
}

function mapStateToProps({devicePinReducer}) {
  return {pin_set: devicePinReducer.pin_set};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(DevicePinActions, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(DevicePinPage);
