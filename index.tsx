import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider, connect, ConnectedProps, batch } from "react-redux";
import { store, increment } from "./store";

const divEl = document.querySelector("div");

const Counter: React.FC<ConnectedProps<typeof connectThis>> = ({
  count,
  dispatch
}) => (
  <div>
    <div>{count}</div>
    <button
      onClick={() => {
        fetch("https://httpbin.org/get").then(() => {
          dispatch(increment());
          dispatch(increment());
        });
      }}
    >
      Increment twice
    </button>
  </div>
);

const connectThis = connect(state => ({ count: state }));
const CounterEnhanced = connectThis(Counter);

ReactDOM.render(
  <Provider store={store}>
    <CounterEnhanced />
  </Provider>,
  divEl
);
