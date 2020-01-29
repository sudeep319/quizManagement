import React, { Component } from 'react';
import * as APIService from '../API.services';
import Message from './Message';
import Error from './Error';
import * as Cookie from "js-cookie";
import Button from '@material-ui/core/Button';

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';


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
                errMsg: loginResult ? loginResult.data.message : 'Server Error'
            });
        } else {
            this.setState({
                loginSuccess: true,
                error: false,
            });
            Cookie.set('auth', loginResult.data.token)
            localStorage.setItem("role", loginResult.data.role);
            if (loginResult.data.role === 'admin')
                this.props.history.push('/admin-dashboard');
            else
                this.props.history.push('/user-dashboard');
        }

    };

    render() {
        const { loginSuccess, error, errMsg, user_name, password } = this.state;

        return (
            <div className="Login center">
                <h1> Quiz Management Login </h1>
                    <div className="f-group">
                        <ValidatorForm
                            className="login-form"
                            ref="form"
                            onSubmit={this.onSubmit}
                            onError={errors => console.log(errors)}
                        >
                            <TextValidator
                                label="Username"
                                onChange={this.handleOnChangeUserName}
                                name="username"
                                value={user_name}
                                fullWidth
                                validators={['required']}
                                errorMessages={['this field is required']}
                            />
                            <TextValidator
                                label="Password"
                                onChange={this.handleOnChangePassword}
                                name="password"
                                value={password}
                                fullWidth
                                validators={['required']}
                                errorMessages={['this field is required']}
                            />
                            <Button className="login-btn" variant="contained" type="submit" color="primary" disableElevation>
                            Login
                            </Button>
                        </ValidatorForm>



                    </div>
                    
                {loginSuccess && <Message message='Login successfully' />}
                {error && <Error message={errMsg} />}
            </div>
        );
    }
}