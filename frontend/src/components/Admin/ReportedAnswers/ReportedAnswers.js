import React, { Component } from 'react';
import axios from 'axios';

import AnswersTable from './AnswersTable/AnswersTable';
import Pagination from '../../UI/Pagination/Pagination';
import ModalWindow from '../../UI/ModalWindow/ModalWindow';

class ReportedAnswers extends Component {
  state = {
    answers: [],
    toDisplay: [],
    linkData: [
      { goTo: 'registrations', label: 'Registrations' },
      { goTo: 'users', label: 'Users' },
    ],
    pagination: {
      per: 2,
      current: 1,
    },
    showModal: false,
    selectedAnswer: null,
    isNoReports: false,
  };

  deleteAnswerHandler = () => {
    axios
      .delete(
        `http://localhost:8080/forum/answers/${this.state.selectedAnswer.id}`
      )
      .then(response => {
        const id = this.state.selectedAnswer.id;
        const answers = this.removeAnswer([...this.state.answers], { id });
        this.initPagination(answers);
      });
  };

  removeReportHandler = () => {
    const id = this.state.selectedAnswer.id;
    axios
      .put('http://localhost:8080/forum/answers', {
        id,
        isReported: !this.state.selectedAnswer.isReported,
      })
      .then(response => {
        const updatedAnswer = response.data.result;
        const answers = this.removeAnswer(
          [...this.state.answers],
          updatedAnswer
        );
        this.initPagination(answers);
      });
  };

  removeAnswer = (answers, updatedAnswer) => {
    const answerIndex = answers.findIndex(
      answer => answer.id === updatedAnswer.id
    );
    answers.splice(answerIndex, 1);
    return answers;
  };

  modalViewHandler = event => {
    const id = +event.target.dataset.answerid;
    const selectedAnswer = { ...this.state.answers.find(ans => ans.id === id) };
    this.setState({ showModal: true, selectedAnswer });
  };

  modalCloseHandler = () => {
    this.setState({ showModal: false });
  };

  pageChangeHandler = event => {
    const { answers, pagination } = this.state;

    const parent = event.target.closest('.btn');
    const next = +parent.dataset.goto;
    const toDisplay = this.pageContentSlicer(answers, next, pagination.per);

    this.setState({ toDisplay, pagination: { ...pagination, current: next } });
  };

  pageContentSlicer = (answers, page, per) => {
    const start = per * (page - 1);
    const end = per * page;

    return answers.slice(start, end);
  };

  initPagination = answers => {
    const { pagination } = this.state;
    let { current, per } = pagination;

    const last = Math.ceil(answers.length / per);
    current = last < current ? last : current;
    const toDisplay = this.pageContentSlicer(answers, current, per);

    const isNoReports = answers.length === 0;

    this.setState({
      answers,
      toDisplay,
      pagination: { ...pagination, current, last },
      showModal: false,
      isNoReports,
    });
  };

  componentDidMount() {
    axios.get('http://localhost:8080/forum/answers/reports').then(response => {
      const answers = response.data.result;
      this.initPagination(answers);
    });
  }

  render() {
    return (
      <div className="p-2 border rounded shadow bg-light">
        <ModalWindow
          showModal={this.state.showModal}
          closeModal={this.modalCloseHandler}
          removeReport={this.removeReportHandler}
          delete={this.deleteAnswerHandler}
          answer={this.state.selectedAnswer}
        />

        <div>
          <h3>Reported Answers</h3>
        </div>
        <div className="pt-3 border-top table-responsive">
          <AnswersTable
            answers={this.state.toDisplay}
            clicked={this.modalViewHandler}
            isNoReports={this.state.isNoReports}
          />
        </div>
        <div className="d-flex justify-content-between">
          <Pagination
            {...this.state.pagination}
            clicked={this.pageChangeHandler}
          />
        </div>
      </div>
    );
  }
}

export default ReportedAnswers;
