import React, { Component } from "react";
import { connect } from "react-redux";
import "./SingleResult.css";

class SingleResult extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { title, results, totalAnswers } = this.props;

    return (
      <div className="singleResult">
        <div className="title">{title}</div>
        <div className="singleResult__results">
          {Object.entries(results).map(([answer, totals], index) => {
            const percentages = Math.round((totals / totalAnswers) * 100) || 0;
            return (
              <div className="display-content" key={index}>
                <div>{answer}</div>
                <progress
                  id="file"
                  value={totals}
                  max={totalAnswers}
                ></progress>
                <div className="totals">{`${totals}/${totalAnswers} (${percentages}%)`}</div>
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
});

export default connect(mapStateToProps)(SingleResult);
