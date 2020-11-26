import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { createReducer } from "@reduxjs/toolkit";
import { data as defaultState } from "./data";
import { Provider } from "react-redux";
import App from "./App";

const reducer = createReducer(defaultState, {
  SET_STATE: (state, { payload }) => {
    console.log("payload", payload);
    state.filters = payload.filters;
    state.poll_details = payload.poll_details;
    state.polls = payload.polls;
    state.user = payload.user;
    state.answers = payload.answers;
  },
});

const store = createStore(reducer, defaultState);
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
