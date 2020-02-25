import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Table from './Table';

const Dashboard = () => {
  // (function() {
  //   if (window.localStorage) {
  //     if (!localStorage.getItem('firstLoad')) {
  //       localStorage['firstLoad'] = true;
  //       window.location.reload();
  //     } else localStorage.removeItem('firstLoad');
  //   }
  // })();
  return (
    <Fragment>
      <Table />
    </Fragment>
  );
};
Dashboard.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, {})(Dashboard);
