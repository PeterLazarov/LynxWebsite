import React, { Component } from 'react';
import _ from 'lodash';
import DailyDataGrid from '../components/dailyData/DailyDataGrid';
import CaseUpdatesGrid from '../components/dailyData/CaseUpdatesGrid';
import PatientsGrid from '../components/dailyData/PatientsGrid';
import NavigationBar from '../components/NavigationBar';
import urlRoutes from '../config/url-routes';
import apiRoutes from '../config/api-routes';
import texts from '../config/texts';
import http from '../utils/http';
import helper from '../utils/helper';

export default class ProvincesPage extends Component {
    state = {
        province: null,
        dailyCaseData: [],
        caseUpdates: [],
        patients: []
    }

    static getInitialProps({query}) {
        return {query}
    }

    async componentDidMount() {
        if (this.props.query && (this.props.query.region || this.props.query.province)) {
            let province = await this.loadProvince(this.props.query);
            let dailyCaseData = [];
            let caseUpdates = [];
            let patients = [];

            if (province) {
                dailyCaseData = await this.loadDailyCaseData(province);
                caseUpdates = await this.loadCaseUpdates(province);
                patients = await this.loadPatients(province);
            }
            
            this.setState({ province, dailyCaseData, caseUpdates, patients });
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
                <div className="content-container">
                    {state.province &&
                        <label className="heading centered">{heading} - {texts.details}</label>}

                    {state.dailyCaseData.length > 0 &&
                        <DailyDataGrid dailyCaseData={state.dailyCaseData}/>}

                    {state.province && state.caseUpdates.length > 0 &&
                        <label className="heading centered">{texts.caseUpdates}</label>}

                    {state.caseUpdates.length > 0 &&
                        <CaseUpdatesGrid caseUpdates={state.caseUpdates}/>}
                        
                    {state.province && state.patients.length > 0 &&
                        <label className="heading centered">{texts.patients}</label>}

                    {state.patients.length > 0 &&
                        <PatientsGrid patients={state.patients}/>}
                </div>
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

    async loadPatients(province) {
        const query = helper.objectToQuery({
            country: province.region,
        });
        const result = await http.request(`${apiRoutes.PATIENT}${query}`);

        return !_.isEmpty(result.data) ? result.data : [];
    }

    async loadCaseUpdates(province) {
        const query = helper.objectToQuery({
            country: province.region,
            location: province.province,
        });
        const result = await http.request(`${apiRoutes.CASE_UPDATE}${query}`);

        return !_.isEmpty(result.data) ? result.data : [];
    }
}