import React, { Component } from "react";
import { connect } from "react-redux";
import "./PollsList.css";

import "./PollsList.css";

class PollsList extends Component {
  constructor(props) {
    super(props);
  }

  handleClick(id) {
    fetch(`https://landing-page-media.co.il/poll/get-answers/?id=${id}`)
      .then((response) => response.json())
      .then((state) => {
        this.props.dispatch({
          type: "SET_STATE",
          payload: state,
        });
      });
  }
  render() {
    const { polls } = this.props;
    return (
      <div className="pollsList">
        {polls.map(
          ({ id, title, client, date, subject, author_mail, color }) => (
            <div
              key={id}
              className="poll__item"
              onClick={() => this.handleClick(id)}
            >
              <div className="title" style={{ backgroundColor: color }}>
                <div className="poll__client">{client}</div>
              </div>
              <div className="poll__text">
                <div className="poll__title">{title}</div>
                <div>{date}</div>
                <div>{author_mail}</div>
                <div>{subject}</div>
              </div>
            </div>
          )
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  polls: state.polls,
});

export default connect(mapStateToProps)(PollsList);
