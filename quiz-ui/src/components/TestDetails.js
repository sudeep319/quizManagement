import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as APIService from '../API.services';
import Message from './Message';
import Error from './Error';
// import axios from 'axios';
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

class Question extends React.Component {

    delete(id, test_id) {
        const result = this.props.onDeleteQues(id, test_id);
        result.then(res => {
            this.props.getTestDetails(test_id);
        })

    }
    render() {
        const { ques, sl } = this.props
        return (
            <div>
                <div className="row">
                    <div className="col-md-11">
                        <h5>{sl}.{ques.question}</h5>
                    </div>
                    <div className="col-md-1">
                        <Link to={this.props.myroute} onClick={this.delete.bind(this, ques._id, ques.test_id)} style={{ color: 'red' }} >Delete</Link>
                    </div>
                    <div className="col-md-3">
                        <p>(1){ques.option1}</p>
                    </div>
                    <div className="col-md-3">
                        <p>(2){ques.option2}</p>
                    </div>
                    <div className="col-md-3">
                        <p>(3){ques.option3}</p>
                    </div>
                    <div className="col-md-3">
                        <p>(4){ques.option4}</p>
                    </div>
                    <div className="col-md-12">
                        <h5>Answer:{ques.ans}</h5>
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
            errMsg: '',
            showAddQuestionDialog: false,
            ques: null,
            option1: null,
            option2: null,
            option3: null,
            option4: null,
            ans: 0,
            test_id: null,
        };
    }
    componentDidMount() {
        this.setState({ test_id: this.props.location.test_id });
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
    closeQuesDialog = (e) => {
        this.setState({ showAddQuestionDialog: false });
    }
    onAddQuesClick = (e) => {
        this.setState({ showAddQuestionDialog: true });
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
                this.getTestDetails(dataObj.test_id)
            }
        })
    }
    onDeleteQues(id, test_id) {
        return APIService.deleteQuestion(id, test_id).then(result => {
        })
    }
    onOptionChange = (e) => {
        this.setState({ ans: e.target.value });
    }
    renderQuestions() {
        return this.state.questions.map(function (ques, i) {
            return <Question ques={ques} onDeleteQues={this.onDeleteQues} getTestDetails={this.getTestDetails} key={i} sl={i + 1} myroute={this.props.location.pathname} />;
        }, this)
    }
    render() {
        const { error, errMsg, testObj, showAddQuestionDialog } = this.state;

        if (testObj) {
            return (
                <div className="container">
                    <h4 className="mt-2">Test Details:</h4>
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

                    <table className="table table-borderless">
                        <tbody>
                            <tr>
                                <th width="120px">Test Name</th>
                                <td width="5px">:</td>
                                <td>{testObj.test_name}</td>
                                <th width="150px">Total Question</th>
                                <td width="5px">:</td>
                                <td>{testObj.total_ques}</td>
                                <th width="120px">Total Marks</th>
                                <td width="5px">:</td>
                                <td>{testObj.total_marks}</td>
                                <th width="100px">Duration</th>
                                <td width="5px">:</td>
                                <td>{testObj.duration}</td>
                            </tr>

                        </tbody>

                    </table>
                    <div className="row">
                        <div className="col-md-2">
                            <h4>Questions:</h4>
                        </div>
                        <div className="col-md-10">
                            <button type="button"
                                onClick={this.onAddQuesClick}
                                className="btn btn-primary">
                                Add Question
                            </button>
                        </div>
                    </div>


                    {this.renderQuestions()}
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