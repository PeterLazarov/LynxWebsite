import React, { Component } from 'react';
import Link from 'next/link';
import RegionsGrid from '../components/regions/RegionsGrid';
import RegionsFilter from '../components/regions/RegionsFilter';
import NavigationBar from '../components/NavigationBar';
import urlRoutes from '../config/url-routes';
import apiRoutes from '../config/api-routes';
import http from '../utils/http';
import helper from '../utils/helper';

export default class RegionsPage extends Component {
    state = {
        regionData: [],
        filter: {
            
        }
    }

    async componentDidMount() {
        let regionData = await this.loadRegionData();

        this.setState({ regionData: regionData });
    }

    render() {
        return (
            <div className='page'>
                <NavigationBar activeRoute={urlRoutes.REGIONS} />

                <RegionsFilter 
                    filter={this.state.filter} 
                    onFilterChange={this.onFilterChange.bind(this)}/>

                {this.state.regionData.length > 0 &&
                    <RegionsGrid regionData={this.state.regionData}/>}
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