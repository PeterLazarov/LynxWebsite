import React, { Component } from 'react';
import _ from 'lodash';
import Papa from 'papaparse';
import BlockUi from 'react-block-ui';
import NavigationBar from '../components/NavigationBar';
import ImportForm from '../components/import/ImportForm';
import ImportType from '../components/import/ImportType';
import HeaderReplacements from '../components/import/HeaderReplacements';
import SpecialHeaderReplacements from '../components/import/SpecialHeaderReplacements';
import ImportBoolFields from '../components/import/ImportBoolFields';
import urlRoutes from '../config/url-routes';
import apiRoutes from '../config/api-routes';
import http from '../utils/http';

export default class ImportPage extends Component {
    state = {
        blocking: false,
    };

    async componentDidMount() {
        var isSignedIn = await http.request(apiRoutes.IS_SIGNED_IN);
        debugger;
    }

    render() {
        return (
            <div className='page'>
                <NavigationBar activeRoute={urlRoutes.IMPORT}/>
                
                <div className="content-container">
                <BlockUi tag="div" blocking={this.state.blocking}>
                    <ImportForm onImport={this.onImport.bind(this)} /> 
                </BlockUi>
                </div>
            </div>
        );
    }

    async onImport(importFile, importType)
    {
        let that = this;
        if (importFile) {
            let reader = new FileReader();
            reader.onload = function(e) { 
                let contents = e.target.result;

                let objects = that.parseCSVObjects.call(that, contents, importType);

                if (importType === ImportType.confirmed 
                    || importType === ImportType.deaths 
                    || importType === ImportType.recovered) {

                    objects = that.fixProvinceDailyData.call(that, objects, importType);
                }

                that.performImport(objects, importType);
            }
            reader.readAsText(importFile);
        }
    }

    parseCSVObjects(content, importType){
        let result = Papa.parse(content, {
            header: true,
            transformHeader: header => {
                let replacement = HeaderReplacements[header];
                
                if (replacement) {
                    header = replacement;
                }
                else if (SpecialHeaderReplacements.specialHeaders.indexOf(header) > -1){
                    header = SpecialHeaderReplacements[importType][header];
                }
                
                return header;
            },
            transform: (value, header) => {
                if (ImportBoolFields.indexOf(header) > -1) {                    
                    value = !!Number(value);
                }
                else if (header.toLowerCase() === 'id') {
                    value = null;
                }
                else if (header === 'Region' && value === 'Mainland China'){
                    value = 'China';
                }

                return value;
            }
        });

        return result.data;
    }

    fixProvinceDailyData(provinceData, importType) {
        let regex = /\d{1,2}\/\d{1,2}\/\d{2}/g;
        _.forIn(provinceData, (province) => {
            _.forOwn(province, (value, key) => {
                if (regex.exec(key)) {
                    if (province.DailyData === undefined) province.DailyData = [];

                    province.DailyData.push({
                        day: key,
                        cases: value,
                        status: importType
                    });
                    delete province[key];
                }
                regex.lastIndex = 0;
            });
        });

        return provinceData;
    }

    async performImport(objects, importType) {
        let url = apiRoutes.IMPORT_PROVINCE_DATA;

        switch (importType) {
            case ImportType.data: 
                url = apiRoutes.IMPORT_REGION_DATA;
                break;
            case ImportType.openLineList: 
                url = apiRoutes.IMPORT_PATIENT_DATA;
                break;
            case ImportType.lineListData: 
                url = apiRoutes.IMPORT_CASE_UPDATE_DATA;
                break;
        }
        this.setState({ blocking: true });
        await http.request(url, {
            verb: 'POST',
            body: {
                importData: objects,
            }
        });
        this.setState({ blocking: false });
    }
}