import React, { Component } from 'react';
import _ from 'lodash';
import urlRoutes from '../../config/url-routes';
import texts from '../../config/texts';

export default class LoginForm extends Component {
    state = {
        username: '',
        password: '',
        usernameError: false,
        passwordError: false
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
                        type='button' 
                        value={texts.login} 
                        className='button full-width' 
                        onClick={this.onTryLogin.bind(this)}/>
                </div>
            </div>
        );
    }

    isValid() {
        return !_.isNull(this.state.password) && !_.isNull(this.state.username);
    }

    onTryLogin() {
        if (this.isValid()) {
            this.props.onLogin({
                username: this.state.username,
                password: this.state.password
            });
        }
        else {
            this.setState({
                usernameError: _.isNull(this.state.username),
                passwordError: _.isNull(this.state.password)
            });
        }
    }
}