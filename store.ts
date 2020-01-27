import { createStore, Reducer } from "redux";

type IncrementAction = { type: "Increment" };
export const increment = (): IncrementAction => ({ type: "Increment" });

type Action = IncrementAction;

type State = number;
const initialState: State = 0;
const reducer: Reducer<State, Action> = (state = initialState, action) =>
  action.type === "Increment" ? state + 1 : state;

export const store = createStore(reducer);
