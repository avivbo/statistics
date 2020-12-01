import React, { Component } from "react";
import { connect } from "react-redux";
import "./MultipleResult.css";

class MultipleResult extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { title, results, totalAnswers } = this.props;
    return (
      <div className="multipleResult">
        <div className="title">{title}</div>
        <div className="multipleResult__results">
          {Object.entries(results).map(([answer, totals], index) => {
            const percentages = Math.round((totals / totalAnswers) * 100) || 0;
            return (
              <div className="multipleResult__result" key={index}>
                <div className="totals-count">{totals}</div>
                <div
                  className="totals"
                  style={{
                    height: `calc(${percentages} * 2px + 24px)`,
                  }}
                >{`${percentages}%`}</div>
                <div>{answer}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  totalAnswers: state.poll_details.answers.length,
  questions: state.poll_details.questions,
});

export default connect(mapStateToProps)(MultipleResult);
