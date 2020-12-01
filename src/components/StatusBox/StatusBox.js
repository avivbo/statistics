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
import ExportToExcel from "../ExportToExcel/ExportToExcel";

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
    const { id } = this.props;

    e.preventDefault();

    this.props.dispatch({
      type: "SHOW_SPINNER",
    });
    fetch(`https://landing-page-media.co.il/poll/test/?id=${id}`, {
      method: "GET",
    })
      .then((response) => response.blob())
      .then((blob) => {
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = url;
        a.download = "results.pdf";
        document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
        a.click();
        a.remove(); //afterwards we remove the element again
      })
      .then(() => {
        this.props.dispatch({
          type: "HIDE_SPINNER",
        });
      });
  }

  handleExcel(e) {
    e.preventDefault();

    const title = document.querySelector("h1").textContent;
    const rows = [];

    document.querySelectorAll(".results > *").forEach((answer) => {
      if (answer.classList.contains("singleResult")) {
        const title = answer
          .querySelector(".title")
          .textContent.replace(",", "");
        rows.push([title, ""]);

        answer.querySelectorAll(".display-content").forEach((answer) => {
          const answerText = answer.querySelector(".display-content__answer")
            .textContent;
          const answerValue = answer.querySelector(".totals").textContent;
          rows.push([answerText, answerValue]);
        });
        rows.push([" ", " "]);
      }
    });

    let csvContent = "data:te,\n";

    rows.forEach(function (rowArray) {
      let row = rowArray.join(",");
      csvContent += row + "\r\n";
    });

    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "my_data.csv");
    document.body.appendChild(link); // Required for FF

    link.click(); // This will download the data file named "my_data.csv".

    var csvString = "ı,ü,ü,ğ,ş,#Hashtag,ä,ö";
    var universalBOM = "\uFEFF";
    var a = window.document.createElement("a");
    a.setAttribute(
      "href",
      "data:text/csv; charset=utf-8," +
        encodeURIComponent(universalBOM + csvContent)
    );

    console.log(
      "data:text/csv; charset=utf-8," +
        encodeURIComponent(universalBOM + csvContent)
    );
    a.setAttribute("download", "example.csv");
    window.document.body.appendChild(a);
    a.click();
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
          <a
            className="pdf-btn"
            target="_blank"
            href="/"
            onClick={this.handleExcel}
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
