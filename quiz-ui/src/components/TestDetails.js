import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as APIService from '../API.services';
import Message from './Message';
import Error from './Error';
// import axios from 'axios';

class Question extends React.Component {

    delete(i) {
        this.props.onDeleteQues(i);
    }
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <label>Question: </label>
                            <input
                                type="test"
                                className="form-control"
                                onChange={this.onChangeQuestion}
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Option1: </label>
                            <input
                                type="text"
                                className="form-control"
                                onChange={this.onChangeOption1}
                            />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Option2: </label>
                            <input
                                type="number"
                                className="form-control"
                                onChange={this.onChangeOption2}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default class TestDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            testObj: null,
            questions: [],
            error: false,
            errMsg: ''
        };
    }
    componentDidMount() {
        console.log(this.props.location.test_id)
        this.getTestDetails(this.props.location.test_id)
    }
    getTestDetails = (id) => {
        APIService.getTestDetails(id).then(testObj => {
            this.setState({ testObj: testObj.data.test, questions: testObj.data.questions });
            console.log(this.state)
        })
            .catch(error => {
                this.setState({ error: true });
            })
    }

    addQuestions() {
        for (var i = 0; i < this.state.total_ques; i++) {
            return <Question onDeleteData={this.onDeleteQues} key={i} />;
        }
    }
    render() {
        const { error, errMsg, testObj, total_ques, total_marks, questions } = this.state;

        if (testObj) {
            return (
                <div className="container">
                    <h5>Test Details:</h5>
                    <table className="table table-borderless">
                        <tbody>
                            <tr>
                                <td width="100px">Test Name</td>
                                <td width="10px">:</td>
                                <td>{testObj.test_name}</td>
                            </tr>
                            <tr>
                                <td width="150px">Total Question</td>
                                <td width="10px">:</td>
                                <td>{testObj.total_ques}</td>
                            </tr>
                            <tr>
                                <td width="100px">Total Marks</td>
                                <td width="10px">:</td>
                                <td>{testObj.total_marks}</td>
                            </tr>
                            <tr>
                                <td width="100px">Duration</td>
                                <td width="10px">:</td>
                                <td>{testObj.duration}</td>
                            </tr>
                        </tbody>

                    </table>
                </div>
            );
        } else {
            return (
                <div className="container">
                </div>
            );
        }
    }
}