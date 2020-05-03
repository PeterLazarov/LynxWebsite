import React, { Component } from 'react';
import urlRoutes from '../config/url-routes';
import texts from '../config/texts';

export default class HomePage extends Component {
    render() {
        return (
            <div className='page'>
                <div className='form centered'>
                    <a href={urlRoutes.LOGIN} className='link-button'>{texts.login} </a>
                    <a href={urlRoutes.REGISTER} className='link-button'>{texts.register} </a>
                </div>
            </div>
        );
    }
}