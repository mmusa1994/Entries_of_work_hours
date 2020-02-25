import React, { Fragment } from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

const EditWorkDay = ({ workDays: { data } }) => {
  function dateFormat() {
    let d = new Date(),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    const date = [year, month, day].join('-');
    return date;
  }
  const header = dateFormat(data.day);
  return (
    <Fragment>
      <form className="container edit">
        <h1>
          Day <strong>{header}</strong>{' '}
        </h1>
        <label>
          {' '}
          <strong>Date:</strong>
        </label>
        <Moment format="DD/MM/YYYY">{moment.utc(data.day)}</Moment>
        <br />
        <label>
          {' '}
          <strong>From:</strong>
        </label>
        <Moment format="HH:mm">{moment.utc(data.from)}</Moment> <br />
        <label>
          <strong>To:</strong>{' '}
        </label>
        <Moment format="HH:mm">{moment.utc(data.to)}</Moment> <br />
        <label>
          <strong>Description</strong>
        </label>
        <p> {data.description} </p>
        <a className="btn btn-outline-dark" href="/dashboard">
          {' '}
          Back to Table
        </a>
      </form>
    </Fragment>
  );
};
EditWorkDay.propTypes = {
  workDays: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  workDays: state.workDays
});

export default connect(mapStateToProps, {})(EditWorkDay);
