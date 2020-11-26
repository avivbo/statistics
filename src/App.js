import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import { data as defaultState } from "./data";
import { connect } from "react-redux";

import Header from "./components/header/header";
import PollsList from "./components/PollsList/PollsList";
import Results from "./components/Results/Results";
import StatusBox from "./components/StatusBox/StatusBox";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      state: {},
    };
  }

  componentDidMount() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const id = urlParams.get("id") || 718;
    fetch(`https://landing-page-media.co.il/poll/get-answers/?id=${id}`)
      .then((response) => response.json())
      .then((state) => {
        console.log(state);
        this.props.dispatch({
          type: "SET_STATE",
          payload: state,
        });
        console.log(state);
      });
  }
  render() {
    return (
      <div className="App">
        <Header />
        <h1>תשובות לשאלון {this.props.title}:</h1>
        <div className="content">
          <Results />
          <StatusBox />
          <PollsList />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  title: state.poll_details.title,
});

export default connect(mapStateToProps)(App);
