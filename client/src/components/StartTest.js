import React, { Component } from 'react';
import * as APIService from '../API.services';
import Countdown from 'react-countdown-now';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const Completionist = () => <span style={{color:'#F51409',backgroundColor:'#F9CEAF',padding:'10px',fontSize:'20px',fontWeight:'bold'}}>Your Time is Up...</span>;
class Question extends React.Component {
    onOptionChange(e) {
        this.props.onOptionChange(this.props.ques._id, e.target.value)
    }
    render() {
        const { ques, sl } = this.props
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <h5>{sl}.{ques.question}</h5>
                    </div>
                    <div className="col-md-12">

                        <RadioGroup aria-label="answer" name="answer" onChange={this.onOptionChange.bind(this)}>
                            <FormControlLabel
                                value="1"
                                control={<Radio color="primary" />}
                                label={ques.option1}
                                labelPlacement="end"
                            />
                            <FormControlLabel
                                value="2"
                                control={<Radio color="primary" />}
                                label={ques.option2}
                                labelPlacement="end"
                            />
                            <FormControlLabel
                                value="3"
                                control={<Radio color="primary" />}
                                label={ques.option3}
                                labelPlacement="end"
                            />
                            <FormControlLabel
                                value="4"
                                control={<Radio color="primary" />}
                                label={ques.option4}
                                labelPlacement="end"
                            />
                        </RadioGroup>
                    </div>
                </div>
            </div>
        )
    }
}

export default class StartTest extends Component {
    constructor(props) {
        super(props);

        this.state = {
            testObj: null,
            questions: [],
            answers: [],
            error: false,
            errMsg: '',
            test_id: null,
            milisec:0
        };
    }
    componentDidMount() {
        this.setState({ test_id: this.props.location.test_id });
        this.getTestDetails(this.props.location.test_id)
    }
    getTestDetails = (id) => {
        APIService.getTestDetails(id).then(testObj => {
            this.setState({ testObj: testObj.data.test, questions: testObj.data.questions, milisec:(Date.now() + (60000 * parseInt(testObj.data.test.duration))) });
            console.log(this.state)
        })
            .catch(error => {
                this.setState({ error: true });
            })
    }

    goBack = () => {
        this.props.history.goBack();
    }
    onOptionChange = (ques_id, ans) => {
        var ansObj = { ques_id: ques_id, ans: ans }
        var ansArr = this.state.answers;
        if (ansArr.length) {
            var isfind = false
            ansArr.map(function (ques, i) {
                if (ques.ques_id === ansObj.ques_id) {
                    ques.ans = ansObj.ans;
                    isfind = true;
                }
            })
            if (!isfind) {
                ansArr.push(ansObj)
            }
        } else {
            ansArr.push(ansObj)
        }
        this.setState({ answers: ansArr });
    }
    submit = () => {
        var ans = this.state.answers;
        const score = {
            pathname: "/score",
            answers: ans
        };
        this.props.history.push(score)
    }
    renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            this.submit()
            // Render a completed state
            return <Completionist />;
        } else {
            // Render a countdown
            return <span style={{color:'#F51409',backgroundColor:'#F9CEAF',padding:'10px',fontSize:'20px',fontWeight:'bold'}}>Remaining Time : {hours}:{minutes}:{seconds}</span>;
        }
    };
    renderQuestions() {
        return this.state.questions.map(function (ques, i) {
            return <Question ques={ques} key={i} sl={i + 1} onOptionChange={this.onOptionChange} />;
        }, this)
    }
    render() {
        const { testObj, milisec } = this.state;

        if (testObj) {
            return (
                <div className="container">
                    <Button onClick={this.goBack} color="primary">
                        Back
                        </Button>
                    <div className="row">
                        <div className="col-md-8">
                            <h4 className="mt-2">Test Details:</h4>
                        </div>
                        <div className="col-md-4">
                            <Countdown
                                date={milisec}
                                renderer={this.renderer}
                            />
                        </div>
                    </div>

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
                                <td>{testObj.duration} min</td>
                            </tr>

                        </tbody>

                    </table>
                    <div className="row">
                        <div className="col-md-2">
                            <h4>Questions:</h4>
                        </div>
                    </div>


                    {this.renderQuestions()}

                    <div className="col-md-12 text-right">
                        <Button onClick={this.submit} variant="contained" color="primary" disableElevation>Submit</Button>

                    </div>
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