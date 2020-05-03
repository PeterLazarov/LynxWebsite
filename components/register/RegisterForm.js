import React, { Component } from 'react';
import _ from 'lodash';
import urlRoutes from '../../config/url-routes';
import texts from '../../config/texts';

export default class RegisterForm extends Component {
    state = {
        username: '',
        password: '',
        repeatPassword: '',
        usernameError: false,
        passwordError: false,
        repeatPasswordError: false,
        differentPasswordsError: false
    }

    render() {
        return (
            <div className='form centered'>
                <div className="form-row">
                    <input 
                        type='text' 
                        placeholder={texts.username} 
                        className='input full-width'
                        defaultValue={this.state.username}
                        onInput={(e) => this.setState({username: _.trim(e.target.value)}) } />
                </div>
                <div className="form-row">
                    <input 
                        type='password' 
                        placeholder={texts.password} 
                        className='input full-width' 
                        defaultValue={this.state.password}
                        onInput={(e) => this.setState({password: _.trim(e.target.value)}) } />
                </div>
                <div className="form-row">
                    <input 
                        type='password' 
                        placeholder={texts.repeatPassword} 
                        className='input full-width' 
                        defaultValue={this.state.repeatPassword}
                        onInput={(e) => this.setState({repeatPassword: _.trim(e.target.value)}) } />
                </div>
                <div className="form-row">
                    <input 
                        type='button' 
                        value={texts.register} 
                        className='button full-width' 
                        onClick={this.onTryRegister.bind(this)}/>
                </div>
            </div>
        );
    }

    isValid() {
        return !_.isNull(this.state.password) && !_.isNull(this.state.repeatPassword) 
            && !_.isNull(this.state.username) && this.state.password === this.state.repeatPassword;
    }

    onTryRegister() {
        const { state } = this;
        if (this.isValid()) {
            this.props.onRegister({
                username: state.username,
                password: state.password
            });
        }
        else {
            this.setState({
                usernameError: _.isNull(state.username),
                passwordError: _.isNull(state.password),
                repeatPasswordError: _.isNull(state.repeatPassword),
                differentPasswordsError: state.password === state.repeatPassword
            });
        }
    }
}