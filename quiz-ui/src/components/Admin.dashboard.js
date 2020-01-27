import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as APIService from '../API.services';
import Message from './Message';
import Error from './Error';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

// import axios from 'axios';


class Test extends React.Component {

    delete(id) {
        const result = this.props.onDeleteTest(id);
        result.then(res => {
            this.props.getTestList();
        })

    }
    addQuestion(test_id) {
        this.props.onAddQuesClick(test_id)
    }
    render() {
        const { test } = this.props
        const testDetails = { 
            pathname: "/test-details", 
            test_id: test._id 
          };
        return (
            <tr>
                <td>
                <Link to={testDetails} onClick={this.addQuestion.bind(this, test._id)}>{test.test_name}</Link></td>
                <td>{test.total_ques}</td>
                <td>{test.total_marks}</td>
                <td>{test.duration}</td>
                <td>
                    <Link to={this.props.myroute} onClick={this.addQuestion.bind(this, test._id)}>Add Question</Link>
                    <Link to={this.props.myroute} onClick={this.delete.bind(this, test._id)} style={{ marginLeft: 20 + 'px' }} >Delete</Link>
                </td>
            </tr>
        )
    }
}
export default class AdminDashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            test_list: [],
            error: false,
            errMsg: '',
            showAddTestDialog: false,
            test_name: null,
            duration: 0,
            showAddQuestionDialog: false,
            ques: null,
            option1: null,
            option2: null,
            option3: null,
            option4: null,
            ans: 0,
            test_id: null,
            selectedOption: null
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
    onAddTestClick = async (e) => {
        this.setState({ showAddTestDialog: true });
    };
    onAddQuesClick = async (test_id) => {
        this.setState({ showAddQuestionDialog: true, test_id: test_id });
    };
    closeTestDialog = (e) => {
        this.setState({ showAddTestDialog: false });
    }
    closeQuesDialog = (e) => {
        this.setState({ showAddQuestionDialog: false });
    }
    SaveTest = () => {
        const dataObj = {
            test_name: this.state.test_name,
            duration: this.state.duration,
            total_ques: 0,
            total_marks: 0
        }
        APIService.addTest(dataObj).then(result => {
            if (result && result.data && result.data.success) {
                this.setState({ showAddTestDialog: false, test_name: null, duration: 0 });
                this.getTestList()
            }
        })
    }
    SaveQues = () => {
        const dataObj = {
            question: this.state.ques,
            option1: this.state.option1,
            option2: this.state.option2,
            option3: this.state.option3,
            option4: this.state.option4,
            ans: this.state.ans,
            test_id: this.state.test_id,

        }
        APIService.addQuestion(dataObj).then(result => {
            if (result && result.data && result.data.success) {
                this.setState({ showAddQuestionDialog: false, ques: null, option1: null, option2: null, option3: null, option4: null, test_id: null, ans: 0 });
                this.getTestList()
            }
        })
    }
    onDeleteTest(id) {
        return APIService.deleteTest(id).then(result => {

        })
    }
    testList() {
        return this.state.test_list.map(function (test, i) {
            return <Test test={test} onAddQuesClick={this.onAddQuesClick} onDeleteTest={this.onDeleteTest} key={i} getTestList={this.getTestList} myroute={this.props.location.pathname} />;
        }, this)
    }

    onOptionChange = (e) => {
        this.setState({ ans: e.target.value });
    }
    render() {
        const { error, errMsg, showAddTestDialog, showAddQuestionDialog, selectedOption } = this.state;

        return (
            <div className="container">
                <h3>Online Quiz Management</h3>
                <h5>Test List:</h5>
                <button type="button"
                    onClick={this.onAddTestClick}
                    className="btn btn-primary">
                    Add Test
                            </button>
                <Dialog open={showAddTestDialog} onClose={this.closeTestDialog} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Add Test</DialogTitle>
                    <DialogContent>
                        <TextField
                            onChange={(e) => this.setState({ test_name: e.target.value })}
                            autoFocus
                            margin="dense"
                            id="test_name"
                            label="Test Name"
                            type="text"
                            fullWidth
                            multiline
                        />
                        <TextField
                            onChange={(e) => this.setState({ duration: e.target.value })}
                            margin="dense"
                            id="duration"
                            label="Duration"
                            type="number"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.closeTestDialog} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.SaveTest} color="primary">
                            Add
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog open={showAddQuestionDialog} onClose={this.closeQuesDialog} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Add Question</DialogTitle>
                    <DialogContent>
                        <div className="row">
                            <div className="col-md-12">
                                <TextField
                                    onChange={(e) => this.setState({ ques: e.target.value })}
                                    autoFocus
                                    margin="dense"
                                    id="ques"
                                    label="Question"
                                    type="text"
                                    fullWidth
                                    multiline
                                />
                            </div>
                            <div className="col-md-6">
                                <TextField
                                    onChange={(e) => this.setState({ option1: e.target.value })}
                                    margin="dense"
                                    id="option1"
                                    label="Option1"
                                    type="text"
                                    fullWidth
                                />
                            </div>
                            <div className="col-md-6">
                                <TextField
                                    onChange={(e) => this.setState({ option2: e.target.value })}
                                    margin="dense"
                                    id="option2"
                                    label="Option2"
                                    type="text"
                                    fullWidth
                                />
                            </div>
                            <div className="col-md-6">
                                <TextField
                                    onChange={(e) => this.setState({ option3: e.target.value })}
                                    margin="dense"
                                    id="option3"
                                    label="Option3"
                                    type="text"
                                    fullWidth
                                />
                            </div>
                            <div className="col-md-6">
                                <TextField
                                    onChange={(e) => this.setState({ option4: e.target.value })}
                                    margin="dense"
                                    id="option4"
                                    label="Option4"
                                    type="text"
                                    fullWidth
                                />
                            </div>
                            <div className="col-md-12">

                                <FormControl component="fieldset" margin="dense">
                                    <FormLabel component="legend">Answer:</FormLabel>
                                    <RadioGroup aria-label="answer" name="answer" value={this.ans} onChange={this.onOptionChange} row>
                                        <FormControlLabel
                                            value="1"
                                            control={<Radio color="primary" />}
                                            label="Option1"
                                            labelPlacement="end"
                                        />
                                        <FormControlLabel
                                            value="2"
                                            control={<Radio color="primary" />}
                                            label="Option2"
                                            labelPlacement="end"
                                        />
                                        <FormControlLabel
                                            value="3"
                                            control={<Radio color="primary" />}
                                            label="Option3"
                                            labelPlacement="end"
                                        />
                                        <FormControlLabel
                                            value="4"
                                            control={<Radio color="primary" />}
                                            label="Option4"
                                            labelPlacement="end"
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                        </div>



                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.closeQuesDialog} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.SaveQues} color="primary">
                            Add
                        </Button>
                    </DialogActions>
                </Dialog>
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