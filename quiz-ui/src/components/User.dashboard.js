import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as APIService from '../API.services';
import Message from './Message';
import Error from './Error';
import Button from '@material-ui/core/Button';

// import axios from 'axios';


class Test extends React.Component {


    render() {
        const { test } = this.props
        const startDetails = {
            pathname: "/start-test",
            test_id: test._id
        };
        return (
            <tr>
                <td>
                    {test.test_name}</td>
                <td>{test.total_ques}</td>
                <td>{test.total_marks}</td>
                <td>{test.duration}</td>
                <td>
                    <Link to={startDetails} style={{ color: 'green' }} >Start Test</Link>
                </td>
            </tr>
        )
    }
}
export default class UserDashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            test_list: [],
            error: false,
            errMsg: '',
        };
    }
    componentDidMount() {
        this.getTestList()
    }
    getTestList = () => {
        APIService.getTestList().then(testResult => {
            this.setState({ test_list: testResult.data });
        })
            .catch(error => {
                this.setState({ error: true });
            })
    }

    testList() {
        return this.state.test_list.map(function (test, i) {
            return <Test test={test} key={i} />;
        }, this)
    }

    logout = (e) => {
        this.props.history.push('/login');
    }
    render() {
        const { error, errMsg } = this.state;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-10">
                        <h3>Online Quiz Management</h3>
                    </div>
                    <div className="col-md-2">
                        <Button onClick={this.logout} color="primary">
                            Logout
                        </Button>
                    </div>
                    <div className="col-md-2">
                        <h5>Test List:</h5>
                    </div>
                </div>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Test Name</th>
                            <th>Total Question</th>
                            <th>Total Marks</th>
                            <th>Duration</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.testList()}
                    </tbody>
                </table>            </div>
        );
    }
}