import React, { Component } from 'react';
import _ from 'lodash';
import Papa from 'papaparse';
import NavigationBar from '../components/NavigationBar';
import ImportForm from '../components/import/ImportForm';
import ImportType from '../components/import/ImportType';
import ImportHeaderReplacements from '../components/import/ImportHeaderReplacements';
import urlRoutes from '../config/url-routes';
import apiRoutes from '../config/api-routes';
import http from '../utils/http';

export default class ImportPage extends Component {
    render() {
        return (
            <div className='page'>
                <NavigationBar activeRoute={urlRoutes.IMPORT}/>
                <ImportForm onImport={this.onImport.bind(this)} /> 
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

                let objects = that.parseCSVObjects.call(that, contents);

                if (importType === ImportType.confirmed 
                    || importType === ImportType.deaths 
                    || importType === ImportType.recovered) {

                    objects = that.fixProvinceDailyData.call(that, objects, importType);
                }

                that.performImport(objects, importType);
            }
            reader.readAsText(importFile);
        }
        console.log(importFile);
    }

    parseCSVObjects(content){
        let result = Papa.parse(content, {
            header: true,
            dynamicTyping: true,
            transformHeader: header => {
                let replacement = ImportHeaderReplacements[header];
                if (replacement) {
                    header = replacement;
                }
                return header;
            },
        });

        return result.data;
    }

    fixProvinceDailyData(provinceData, impoortType) {
        let regex = /\d{1,2}\/\d{1,2}\/\d{2}/g;
        _.forIn(provinceData, (province) => {
            provinceData.Status = impoortType;

            _.forOwn(province, (value, key) => {
                if (regex.exec(key)) {
                    if (province.DailyData === undefined) province.DailyData = [];

                    province.DailyData[key] = value;
                    delete province[key];
                }
                regex.lastIndex = 0;
            });
        });

        return provinceData;
    }

    performImport(objects, importType) {
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
        
        http.request(url, {
            verb: 'POST',
            body: {
                importData: objects,
                // importType: importType
            }
        })
    }
}