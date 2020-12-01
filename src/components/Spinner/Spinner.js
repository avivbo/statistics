import React, { Component } from "react";
import { connect } from "react-redux";
import "./Spinner.css";
import RingLoader from "react-spinners/RingLoader";

class Spinner extends Component {
  render() {
    return (
      <div className="spinner">
        <RingLoader size={300} color={"rgb(54, 215, 183);"} loading={true} />
      </div>
    );
  }
}

export default connect()(Spinner);
