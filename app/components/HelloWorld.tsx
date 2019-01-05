import * as React from 'react';

type HelloWorldProps = {
  message: string,
  sayHello: () => void
}

// stateless functional component >> therefore no TypedState to pass in...
export const HelloWorld: React.SFC<HelloWorldProps> = function(props) {
  return (
    <div>
      <h1> { props.message } </h1>
      <button onClick={() => props.sayHello()}> Say Hello </button>
    </div>
  )
}

HelloWorld.defaultProps = {
  message: "Hello There ELectron... !!"
}
