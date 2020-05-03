import React, { Component } from 'react';
import Link from 'next/link';
import urlRoutes from '../config/url-routes';
import texts from '../config/texts';

export default class NavigationBar extends Component {
    render() {
        const { activeRoute } = this.props
        let importLinkClass = `navigation-link ${activeRoute === urlRoutes.IMPORT ? 'active-link' :'' }`
        let regionsLinkClass = `navigation-link ${activeRoute === urlRoutes.REGIONS ? 'active-link' :'' }`

        return (
            <div className='navigation-bar'>
                <Link href={urlRoutes.IMPORT}><a className={importLinkClass}>
                    {texts.dataImport}
                </a></Link>
                <Link href={urlRoutes.REGIONS}><a className={regionsLinkClass}>
                    {texts.dataRegions}
                </a></Link>
                
                <Link href={urlRoutes.HOME}><a className='navigation-link logout-link'>
                    {texts.logout}
                </a></Link>
            </div>
        );
    }
}