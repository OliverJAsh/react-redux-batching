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
          batch(() => {
            dispatch(increment());
            dispatch(increment());
          });
        });
      }}
    >
      Increment twice
    </button>
  </div>
);

const wait = (ms: number) => {
  var start = new Date().getTime();
  var end = start;
  while (end < start + ms) {
    end = new Date().getTime();
  }
};
const expensiveSelector = () => wait(3000);

const connectThis = connect(state => ({
  count: state,
  expensiveData: expensiveSelector()
}));
const CounterEnhanced = connectThis(Counter);

ReactDOM.render(
  <Provider store={store}>
    <CounterEnhanced />
  </Provider>,
  divEl
);
