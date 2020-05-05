import React, { Component } from 'react';
import _ from 'lodash';
import urlRoutes from '../../config/url-routes';
import texts from '../../config/texts';

export default class RegisterForm extends Component {
    state = {
        username: '',
        password: '',
        repeatPassword: '',
        errors: []
    }

    render() {
        return (
            <div className='form centered'>
                {(this.state.errors.length > 0 || this.props.errors.length > 0) &&
                    <div className="error-panel">
                        {this.state.errors.map((error, index) => 
                            <label className="error-line" key={index}>{error} </label>
                        )}
                        {this.props.errors.map((error, index) => 
                            <label className="error-line" key={index}>{error} </label>
                        )}
                    </div>
                }
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
        return !_.isEmpty(this.state.password) && !_.isEmpty(this.state.repeatPassword) 
            && !_.isEmpty(this.state.username) && this.state.password === this.state.repeatPassword;
    }

    onTryRegister() {
        const { state } = this;
        
        if (this.isValid()) {            
            this.setState({ errors: [] });

            this.props.onRegister({
                username: state.username,
                password: state.password
            });
        }
        else {
            let errors = [];

            if (_.isEmpty(state.username)) {
                errors.push(texts.usernameIsRequired)
            }
            if (_.isEmpty(state.password)) {
                errors.push(texts.passwordIsRequired)
            }
            if (_.isEmpty(state.repeatPassword)) {
                errors.push(texts.pleaseRepeatPassword)
            }
            if (state.password !== state.repeatPassword) {
                errors.push(texts.passwordsDontMatch)
            }

            this.setState({ errors });
        }
    }
}