import React, { Component } from 'react';
import _ from 'lodash';
import { Router } from 'next/router';
import RegisterForm from '../components/register/RegisterForm';
import urlRoutes from '../config/url-routes';
import apiRoutes from '../config/api-routes';
import http from '../utils/http';

export default class RegisterPage extends Component {
    state = {
        errors: []
    }

    render() {
        return (
            <div className='page'>
                <RegisterForm 
                    errors={this.state.errors} 
                    onRegister={this.onRegister.bind(this)} /> 
            </div>
        );
    }
    
    async onRegister(registerUser)
    {
        let result = await http.request(apiRoutes.REGISTER, {
            verb: 'POST',
            body: {
                username: registerUser.username,
                password: registerUser.password
            }
        })
        
        if (result.isOkay){
            Router.push(urlRoutes.IMPORT);
        }
        else {
            let response = JSON.parse(result.data);
            this.setState({
                errors: _.map(response.Errors, 'Description')
            });
        }
    }
}