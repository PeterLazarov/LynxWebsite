import React, { Component } from 'react';
import Router from 'next/router';
import LoginForm from '../components/login/LoginForm';
import urlRoutes from '../config/url-routes';
import apiRoutes from '../config/api-routes';
import http from '../utils/http';

export default class LoginPage extends Component {
    state = {
        errorMessage: '',
    }

    render() {
        return (
            <div className='page'>
               <LoginForm onLogin={this.onLogin.bind(this)} /> 
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
    }
}