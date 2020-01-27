import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as APIService from '../API.services';
import Message from './Message';
import Error from './Error';
// import axios from 'axios';


export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user_name: '',
            password: '',
            error: false,
            loginSuccess: false,
            errMsg: 'Error in login'
        };

    }

    handleOnChangeUserName = (e) => {
        this.setState({
            user_name: e.target.value,
        });
    };

    handleOnChangePassword = (e) => {
        this.setState({
            password: e.target.value,
        });
    };

    onSubmit = async (e) => {
        const data = {
            user_name: this.state.user_name,
            password: this.state.password,
        };
        const loginResult = await APIService.Login(data);

        if (!loginResult || loginResult.status !== 200 || !loginResult.data.success) {
            this.setState({
                error: true,
                loginSuccess: false,
                errMsg: loginResult.data.message
            });
        } else{
            this.setState({
                loginSuccess: true,
                error: false,
            });
            this.props.history.push('/admin-dashboard');
        }
            
    };

    render() {
        const { loginSuccess, error, errMsg } = this.state;

        return (
            <div className="Login center">
                <h1> Quiz Management Login </h1>
                <form onSubmit={this.onSubmit}>
                    <div className="f-group">
                        <div className="fields">
                            <div>
                                <label> User Name: </label>
                            </div>
                            <input type="text"
                                name="Username"
                                onChange={this.handleOnChangeUserName}
                                autoComplete="Username"
                                required />
                        </div>
                        <div className="fields">
                            <div> <label> Password: </label> </div>
                            <input type="password"
                                name="Password"
                                onChange={this.handleOnChangePassword}
                                autoComplete="Password"
                                required />
                        </div>

                    </div>
                    <div className="buttons">
                        <button type="button"
                            onClick={this.onSubmit}
                            className="btn btn-primary">
                            Login
                            </button>
                    </div>
                </form>
                {loginSuccess && <Message message='Login successfully' />}
                {error && <Error message={errMsg} />}
            </div>
        );
    }
}