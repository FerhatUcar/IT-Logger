import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import LogItem from './LogItem';
import Preloader from '../layout/Preloader';
import PropTypes from 'prop-types';
import {getLogs} from "../../actions/logActions";

// destructor log from initial state, get logs and loading
const Logs = ({ log: { logs, loading }, getLogs }) => {
    useEffect(() => {
        getLogs()
            .then(res => console.log(res))
            .catch(err => console.error(err));
        // eslint-disable-next-line
    }, []);

    if (loading || logs === null) return <Preloader />;

    return (
        <ul className='collection with-header'>
            <li className='collection-header'>
                <h4 className='center'>System Logs</h4>
            </li>
            {!loading && logs.length === 0 ? (
                <p className='center'>No logs to show...</p>
            ) : (
                logs.map(log => <LogItem log={log} key={log.id} />)
            )}
        </ul>
    );
};

Logs.propTypes = {
    log: PropTypes.object.isRequired,
    getLogs: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    // same name 'log' as in reducers/index.js
    log: state.log
});

export default connect(
    mapStateToProps,
    { getLogs }
)(Logs);
