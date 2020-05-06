import React, { Component } from 'react';
import Link from 'next/link';
import urlRoutes from '../config/url-routes';
import apiRoutes from '../config/api-routes';
import texts from '../config/texts';
import http from '../utils/http';

export default class NavigationBar extends Component {
    render() {
        const { activeRoute } = this.props
        let importLinkClass = `navigation-link ${activeRoute === urlRoutes.IMPORT ? 'active-link' :'' }`
        let currentLinkClass = `navigation-link ${activeRoute === urlRoutes.CURRENT ? 'active-link' :'' }`

        return (
            <div className='navigation-bar'>
                <Link href={urlRoutes.IMPORT}><a className={importLinkClass}>
                    {texts.dataImport}
                </a></Link>
                <Link href={urlRoutes.CURRENT}><a className={currentLinkClass}>
                    {texts.dataRegions}
                </a></Link>
                
                <Link href={urlRoutes.HOME}><a className='navigation-link logout-link' 
                    onClick={this.onLogout}>
                    {texts.logout}
                </a></Link>
            </div>
        );
    }

    async onLogout(loginUser)
    {
        await http.request(apiRoutes.SIGN_OUT)
    }
}