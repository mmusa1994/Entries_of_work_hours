import React, { Fragment, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addWorkDay } from '../../actions/workDay';
import moment from 'moment';

const AddWorkDay = ({ addWorkDay, history }) => {
  const [formData, setFormData] = useState({
    day: '',
    from: '',
    to: '',
    description: ''
  });
  const { day, from, to, description } = formData;

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
  dateFormat(day);

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  return (
    <Fragment>
      <div className="container">
        <h1 className="large text-primary">Add Your Day</h1>
        <p className="lead">
          <i className="fas fa-code-branch" /> Add from and to time, and put
          some description
        </p>

        <form
          onSubmit={e => {
            e.preventDefault();
            formData.day = moment.utc(formData.day, 'YYYY-MM-DD');
            formData.day.toISOString(true);
            // console.log(formData.day.toISOString(true), ovo je day);

            formData.from = moment.utc(formData.from, 'HH:mm');
            formData.from.toISOString(true);
            // console.log(formData.from.toISOString(true), 'ovo je from');

            formData.to = moment.utc(formData.to, 'HH:mm');
            formData.to.toISOString(true);
            // console.log(formData.to.toISOString(true), 'ovo je to');
            addWorkDay(formData, history);
          }}
        >
          <div className="form mx-3 ">
            <h4>Pick Day</h4>
            <input
              className="form-control"
              type="date"
              id="datepicker"
              name="day"
              value={day}
              onChange={e => onChange(e)}
            />
            <label htmlFor="datepicker">Select date</label>
          </div>
          <div className="form mx-3">
            <h4>From</h4>
            <input
              className="form-control"
              type="time"
              id="timepicker1"
              name="from"
              value={from}
              onChange={e => onChange(e)}
            />
            <label htmlFor="timepicker1">Choose your time</label>
          </div>
          <div className="form mx-3">
            <h4>To</h4>
            <input
              className="form-control"
              type="time"
              id="timepicker2"
              name="to"
              value={to}
              onChange={e => onChange(e)}
            />
            <label htmlFor="timepicker2">Choose your time</label>
          </div>
          <div className="form mx-3 my-3">
            <label htmlFor="Textarea1">Describe your work day</label>
            <textarea
              className="form-control"
              name="description"
              id="Textarea1"
              rows="3"
              placeholder="Program Description"
              value={description}
              onChange={e => onChange(e)}
            ></textarea>
          </div>
          <input type="submit" className="btn btn-primary m-1" />
          <Link className="btn btn-danger m-1" to="/dashboard">
            Cancel
          </Link>
        </form>
      </div>
    </Fragment>
  );
};
AddWorkDay.propTypes = {
  addWorkDay: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  formData: state.formData
});

export default connect(mapStateToProps, { addWorkDay })(withRouter(AddWorkDay));
