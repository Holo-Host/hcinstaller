import * as React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import HelloWorld from '../components/HelloWorld';

// to trigger the action for the ICP call
import makeActions from '../actions/helloWorld'
import makeService from '../actions/services'
export const helloWorldActions = makeActions(makeService())


function mapStateToProps(state: RootState) {
  return {
    message: state.helloWorld.message
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    sayHello: () => dispatch(helloWorldActions.sayHello())
  }
}

type HelloWorldProps = {
  message: string,
  sayHello: () => void
}


class HelloWorldPage extends React.Component<HelloWorldProps> {
  props: Props;

  render() {
    return (
      <HelloWorld
        message={this.props.message}
        sayHello={this.props.sayHello}
      />
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(HomeActions, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(HelloWorldPage);
