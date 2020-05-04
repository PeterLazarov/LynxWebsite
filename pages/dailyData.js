import React, { Component } from 'react';
import _ from 'lodash';
import DailyDataGrid from '../components/dailyData/DailyDataGrid';
import NavigationBar from '../components/NavigationBar';
import urlRoutes from '../config/url-routes';
import apiRoutes from '../config/api-routes';
import http from '../utils/http';
import helper from '../utils/helper';

export default class ProvincesPage extends Component {
    state = {
        province: null,
        dailyCaseData: [],
    }

    static getInitialProps({query}) {
        return {query}
    }

    async componentDidMount() {
        if (this.props.query && (this.props.query.region || this.props.query.province)) {
            let province = await this.loadProvince(this.props.query);
            let dailyCaseData = [];

            if (province) {
                dailyCaseData = await this.loadDailyCaseData(province);
            }
            
            this.setState({ province, dailyCaseData });
        }
    }

    render() {
        const { state } = this;

        let heading = '';

        if (state.province && state.province.region) {
            heading += state.province.region
        }
        if (state.province && state.province.province) {
            heading += `, ${state.province.province}`
        }

        return (
            <div className='page'>
                <NavigationBar />

                {state.province &&
                    <label className="heading centered">{heading} - Details</label>}

                {state.dailyCaseData.length > 0 &&
                    <DailyDataGrid dailyCaseData={state.dailyCaseData}/>}
            </div>
        );
    }

    async loadProvince(filter) {
        const query = helper.objectToQuery({
            ...filter,
        });
        const result = await http.request(`${apiRoutes.PROVINCE}${query}`);
        
        return !_.isEmpty(result.data) ? result.data[0] : null;
    }

    async loadDailyCaseData(province) {
        const query = helper.objectToQuery({
            provinceId: province.id,
        });
        const result = await http.request(`${apiRoutes.COMBINED_DAILY_CASE}${query}`);

        return !_.isEmpty(result.data) ? result.data : [];
    }

    async onFilterChange(newFilter) {
        this.setState({
            filter: newFilter
        });

        let data = await this.loadProvinceData(newFilter);

        this.setState({ provinceData: data });
    }
}