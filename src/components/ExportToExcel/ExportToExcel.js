import React from "react";
import ReactExport from "react-export-excel";
import { connect } from "react-redux";
import { getQuestionByParameter, summaryAnswers } from "../../utils";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const dataSet1 = [
  {
    name: "Johson",
    amount: 30000,
    sex: "M",
    is_married: true,
  },
  {
    name: "Monika",
    amount: 355000,
    sex: "F",
    is_married: false,
  },
  {
    name: "John",
    amount: 250000,
    sex: "M",
    is_married: false,
  },
  {
    name: "Josef",
    amount: 450500,
    sex: "M",
    is_married: true,
  },
];

var dataSet2 = [
  {
    name: "Johnson",
    total: 25,
    remainig: 16,
  },
  {
    name: "Josef",
    total: 25,
    remainig: 7,
  },
];

class ExportToExcel extends React.Component {
  render() {
    const { questions, answers } = this.props;
    const results = summaryAnswers(questions, answers, undefined);
    const resultsParams = Object.keys(results);
    console.log("this.props.questions", this.props.questions);
    return (
      <ExcelFile element={<button>Download Data</button>}>
        <ExcelSheet data={this.props.questions} name="Employees">
          <ExcelColumn label="Name" value="name" />
          <ExcelColumn label="Wallet Money" value="amount" />
          <ExcelColumn label="Gender" value="sex" />
          <ExcelColumn
            label="Marital Status"
            value={(col) => (col.is_married ? "Married" : "Single")}
          />
          {resultsParams.map((parameter, index) => {
            const question = getQuestionByParameter(questions, parameter);
            const title = question.title;

            switch (question.type) {
              case "single":
                console.log(343434);
                return <ExcelColumn label="Gender" value="sex" />;
                break;
            }
            return;
          })}
        </ExcelSheet>
        <ExcelSheet data={dataSet2} name="Leaves">
          <ExcelColumn label="Name" value="name" />
          <ExcelColumn label="Total Leaves" value="total" />
          <ExcelColumn label="Remaining Leaves" value="remaining" />
        </ExcelSheet>
      </ExcelFile>
    );
  }
}

const mapStateToProps = (state) => ({
  answers: state.poll_details.answers,
  questions: state.poll_details.questions,
});

export default connect(mapStateToProps)(ExportToExcel);
