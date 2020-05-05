import React, { Component } from 'react';
import Router from 'next/router';
import LoginForm from '../components/login/LoginForm';
import urlRoutes from '../config/url-routes';
import apiRoutes from '../config/api-routes';
import texts from '../config/texts';
import http from '../utils/http';

export default class LoginPage extends Component {
    state = {
        errors: []
    }

    render() {
        return (
            <div className='page'>
               <LoginForm 
                    errors={this.state.errors} 
                    onLogin={this.onLogin.bind(this)} /> 
            </div>
        );
    }

    async onLogin(loginUser)
    {
        let result = await http.request(apiRoutes.LOGIN, {
            verb: 'POST',
            body: {
                username: loginUser.username,
                password: loginUser.password
            }
        })

        if (result.isOkay){
            Router.push(urlRoutes.IMPORT);
        }
        else {
            let errors = [];
            errors.push(texts.usernameOrPasswordIncorrect)

            this.setState({ errors });
        }
    }
}