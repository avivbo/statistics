import React, { Component } from "react";
import "./Results.css";
import { connect } from "react-redux";
import { summaryAnswers, getQuestionByParameter } from "../../utils";
import SingleResult from "../SingleResult/SingleResult";
import MultipleResult from "../MultipleResult/MultipleResult";

class Results extends Component {
  render() {
    const { questions, answers } = this.props;
    const results = summaryAnswers(questions, answers, undefined);
    const resultsParams = Object.keys(results);
    return (
      <div className="results">
        {resultsParams.map((parameter, index) => {
          const question = getQuestionByParameter(questions, parameter);
          const title = question.title;

          switch (question.type) {
            case "single":
              return (
                <SingleResult
                  key={index}
                  title={title}
                  results={results[parameter]}
                />
              );
            case "multiple":
              return (
                <MultipleResult
                  key={index}
                  title={title}
                  results={results[parameter]}
                />
              );
            default:
              break;
          }
          return;
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.poll_details.questions,
  answers: state.poll_details.answers,
  title: state.poll_details.title,
  date: state.poll_details.date,
});

export default connect(mapStateToProps)(Results);
