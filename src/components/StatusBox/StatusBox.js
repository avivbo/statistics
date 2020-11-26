import React, { Component } from "react";
import { connect } from "react-redux";
import "./StatusBox.css";

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import { pdf } from "@react-pdf/renderer";
import ReactPDF from "@react-pdf/renderer";
import { summaryAnswers, getQuestionByParameter } from "../../utils";

Font.register({
  family: "Roboto",
  src:
    "https://umdigital.co.il/wp-content/themes/umd/fonts/heebo/Heebo-Regular.ttf",
});

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontFamily: "Roboto",
  },
  author: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
    fontFamily: "Roboto",
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "right",
    fontFamily: "Roboto",
  },
  header: {
    textAlign: "right",
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
    fontFamily: "Roboto",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});

class StatusBox extends Component {
  constructor(props) {
    super(props);
    this.habdleReset = this.habdleReset.bind(this);
    this.handlePDF = this.handlePDF.bind(this);
  }
  habdleReset() {
    const { id } = this.props;
    const confirm_to_reset = window.confirm(
      "האם אתה בטוח שברצומך למחוק את כל הנתונים?"
    );

    if (confirm_to_reset) {
      fetch(`https://landing-page-media.co.il/poll/drop-table/?id=${id}`)
        .then(() =>
          fetch(`https://landing-page-media.co.il/poll/get-answers/?id=${id}`)
        )
        .then((response) => {
          return response.json();
        })
        .then((state) => {
          this.props.dispatch({
            type: "SET_STATE",
            payload: state,
          });
        });
    }
  }

  handlePDF(e) {
    e.preventDefault();

    const saveBlob = (blob, filename) => {
      var a = document.createElement("a");
      document.body.appendChild(a);
      a.style.display = "none";
      let url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = filename;
      a.click();
      window.URL.revokeObjectURL(url);
    };

    const savePdf = async (document, filename) => {
      saveBlob(await pdf(document).toBlob(), filename);
    };

    const { questions, answers } = this.props;
    const results = summaryAnswers(questions, answers, undefined);
    const resultsParams = Object.keys(results);

    // Create Document Component
    const MyDocument = () => (
      <Document>
        <Page style={styles.body}>
          <Text style={styles.header} fixed>
            תשובות לשאלון: {this.props.title}
          </Text>
          {resultsParams.map((parameter, index) => {
            const question = getQuestionByParameter(questions, parameter);
            const title = question.title;

            switch (question.type) {
              case "single":
                return (
                  <Text style={styles.text} fixed>
                    {title.replace(/[^א-ת 0-9 ()]/g, "")}
                  </Text>
                );
              case "multiple":
                return;
              default:
                break;
            }
            return;
          })}
        </Page>
      </Document>
    );
    savePdf(<MyDocument />, "my-document.pdf");
    // ReactPDF.render(<MyDocument />, "example.pdf");
  }
  render() {
    return (
      <div className="status-content">
        <div className="buttons">
          <button className="reset-btn" onClick={this.habdleReset}>
            אפס נתונים
          </button>
          <img
            className="excel-btn"
            src="https://landing-page-media.co.il/poll/wp-content/themes/polls/assets/excel.png"
            alt="ייצא לקובץ אקסל"
          />
          <a
            className="pdf-btn"
            target="_blank"
            href="/"
            onClick={this.handlePDF}
          >
            <img
              className="pdf-btn"
              src="https://landing-page-media.co.il/poll/wp-content/themes/polls/assets/pdf.png"
              alt="ייצא לקובץ PDF"
            />
          </a>
        </div>
        <div className="status">
          <div className="status-row">
            <strong>סטטוס: </strong>מופעל
          </div>
          <div className="status-row">
            <strong>כמות משתתפים: </strong>
            <span id="total_participants">{this.props.total}</span>
          </div>
          <div className="status-row">
            <strong>מתאריך: </strong>
            {this.props.date}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  total: state.poll_details.answers.length,
  date: state.poll_details.date,
  id: state.poll_details.id,
  questions: state.poll_details.questions,
  answers: state.poll_details.answers,
  title: state.poll_details.title,
});

export default connect(mapStateToProps)(StatusBox);
