import React, { Component } from 'react';
import * as APIService from '../API.services';
import Button from '@material-ui/core/Button';


export default class Score extends Component {
    constructor(props) {
        super(props);
        this.state = {
            attemp: 0,
            right: 0,
            wrong: 0,
            score: 0,
            error: false,
            errMsg: 'Error'
        };
    }
    componentDidMount() {
        const ansObj = {
            answers: this.props.location.answers
        }

        this.getTestScore(ansObj)
    }
    getTestScore = (answers) => {
        APIService.getTestScore(answers).then(testResult => {
            const scoreData = testResult.data.score
            console.log(scoreData)
            this.setState({ attemp: scoreData.attemp,right:scoreData.right,wrong: scoreData.wrong,score:scoreData.score});
        })
            .catch(error => {
                this.setState({ error: true });
            })
    }

    goHome = ()=>{
        this.props.history.push('/user-dashboard');
    }

    render() {
        const { attemp, right, wrong, score } = this.state;
        return (
            <div className="container mt-5 ">
                 <Button onClick={this.goHome} color="primary">
                                Home
                        </Button>
                <div className="text-center">
                <h3> Thanks to apear in a Test. Your Score is:</h3>
                <tabl className="table table-borderless">
                    <tbody>
                        <tr>
                            <th>Total Attemp</th>
                            <td>:</td>
                            <td>{attemp}</td>
                        </tr>
                        <tr>
                            <th>Total Right</th>
                            <td>:</td>
                            <td>{right}</td>
                        </tr>
                        <tr>
                            <th>Total Wrong</th>
                            <td>:</td>
                            <td>{wrong}</td>
                        </tr>
                        <tr>
                            <th>Total Score</th>
                            <td>:</td>
                            <td>{score}</td>
                        </tr>
                    </tbody>
                </tabl>
                </div>
            </div>
        );
    }
}