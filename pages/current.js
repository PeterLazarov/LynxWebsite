import React, { Component } from 'react';
import Link from 'next/link';
import CurrentGrid from '../components/current/CurrentGrid';
import CurrentFilter from '../components/current/CurrentFilter';
import NavigationBar from '../components/NavigationBar';
import urlRoutes from '../config/url-routes';
import apiRoutes from '../config/api-routes';
import http from '../utils/http';
import helper from '../utils/helper';

export default class RegionsPage extends Component {
    state = {
        regionData: [],
        filter: {
            province: '',
            region: ''
        }
    }
    
    static getInitialProps({query}) {
        return {query}
    }

    async componentDidMount() {
        let regionData = await this.loadRegionData();

        this.setState({ regionData: regionData });
    }

    render() {
        return (
            <div className='page'>
                <NavigationBar activeRoute={urlRoutes.CURRENT} />

                <div className="content-container">
                    <CurrentFilter 
                        filter={this.state.filter} 
                        onFilterChange={this.onFilterChange.bind(this)}/>

                    {this.state.regionData.length > 0 &&
                        <CurrentGrid regionData={this.state.regionData}/>}
                </div>
            </div>
        );
    }

    async loadRegionData(filter) {
        const query = helper.objectToQuery({
            ...filter,
        });
        const result = await http.request(`${apiRoutes.REGION}${query}`);
        
        return !_.isEmpty(result.data) ? result.data : [];
    }

    async onFilterChange(newFilter) {
        this.setState({
            filter: newFilter
        });

        let regionData = await this.loadRegionData(newFilter);

        this.setState({ regionData: regionData });
    }
}