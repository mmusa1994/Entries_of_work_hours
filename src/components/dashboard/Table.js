import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import moment from 'moment';
import { Link } from 'react-router-dom';
import Pagination from '../Pagination';
import { logout } from '../../actions/auth';

import {
  getWorkDay,
  getTableOfWorkDays,
  deleteWorkDay
} from '../../actions/workDay';

const Table = props => {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [daysPerPage] = useState(10);

  // useEffect(() => {
  //   const fetchDays = async => {
  //     setLoading(true);
  //     const res = axios.get('api/workday/table');
  //     setDays(res.data);
  //     setLoading(false);
  //   };
  //   fetchDays();
  // }, []);
  const {
    getWorkDay,
    getTableOfWorkDays,
    deleteWorkDay,
    workDays: { data },
    logout
  } = props;

  useEffect(() => {
    setLoading(true);
    getTableOfWorkDays();
    setLoading(false);
  }, [getTableOfWorkDays]);

  //Get current days
  const IndexOfLastDay = currentPage * daysPerPage;
  const IndexOfFirstDay = IndexOfLastDay - daysPerPage;
  const currentDays = data.slice(IndexOfFirstDay, IndexOfLastDay);

  //Change page
  const paginate = pageNumber => {
    setCurrentPage(pageNumber);
  };

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

  const from = dateFormat(fromDate);
  const to = dateFormat(toDate);

  const startDateFilter = () => {
    const fromDay = data.filter(e => {
      const fDay = moment.utc(e.day, 'YYYY-MM-DD');
      return fDay.isSameOrAfter(moment.utc(fromDate), 'day');
    });
    return fromDay;
  };

  const endDateFilter = () => {
    const toDay = data.filter(e => {
      const tDay = moment.utc(e.day, 'YYYY-MM-DD');
      return tDay.isSameOrBefore(moment.utc(toDate), 'day');
    });
    return toDay;
  };

  let newData = currentDays;

  if (paginate) {
    newData = currentDays;
  }

  if (fromDate) {
    newData = startDateFilter();
  }

  if (toDate) {
    newData = endDateFilter();
  }

  const workdays = newData.map(wd => (
    <tr key={wd._id}>
      <td>
        <Moment format="DD/MM/YYYY">{moment.utc(wd.day)}</Moment>
      </td>
      <td>
        <Moment format="HH:mm">{moment.utc(wd.from)}</Moment>
      </td>
      <td>
        <Moment format="HH:mm">{moment.utc(wd.to)}</Moment>
      </td>

      <td>
        <Link to="/edit-workday" onClick={() => getWorkDay(wd._id)}>
          {' '}
          {wd.description.substr(0, 30)}....{' '}
        </Link>
      </td>
      <td>
        <button
          onClick={() => deleteWorkDay(wd._id)}
          className="btn btn-danger"
        >
          Delete
        </button>
      </td>
    </tr>
  ));
  if (loading) {
    return <h2>Loading...</h2>;
  }
  return (
    <Fragment>
      <div className="container">
        <Link to="/add-workday" className="btn btn-primary btn-lg m-2">
          <i className="far fa-file-alt"></i>
          Add Work Day
        </Link>
        <a className="logout" onClick={logout} href="#!">
          <i className="fas fa-sign-out-alt" />{' '}
          <span className="hide-sm">Logout</span>
        </a>
      </div>

      <table className=" container table table-hover">
        <thead>
          <tr>
            <th scope="col">
              <div className="btn-group dropright">
                <button
                  type="button"
                  className="btn btn-secondary dropdown-toggle"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Day <i className="fas fa-filter"></i>
                </button>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  From
                  <input
                    className="filterbydate"
                    type="date"
                    defaultValue={from}
                    onChange={e => {
                      setFromDate(e.target.value);
                      startDateFilter(e);
                    }}
                  />
                  To
                  <input
                    className="filterbydate"
                    type="date"
                    defaultValue={to}
                    onChange={e => {
                      setToDate(e.target.value);
                      endDateFilter(e);
                    }}
                  />
                </div>
              </div>
            </th>
            <th scope="col">From hours</th>
            <th scope="col">To hours</th>
            <th scope="col">Description</th>
            <th />
          </tr>
        </thead>
        <tbody>{workdays}</tbody>
      </table>
      <div className="container">
        <Pagination
          daysPerPage={daysPerPage}
          totalDays={data.length}
          paginate={paginate}
        />
      </div>
    </Fragment>
  );
};

Table.propTypes = {
  workDays: PropTypes.object.isRequired,
  getTableOfWorkDays: PropTypes.func.isRequired,
  deleteWorkDay: PropTypes.func.isRequired,
  getWorkDay: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  workDays: state.workDays
});

export default connect(mapStateToProps, {
  getWorkDay,
  getTableOfWorkDays,
  deleteWorkDay,
  logout
})(Table);
