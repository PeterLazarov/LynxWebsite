import React, { Component } from 'react';
import ReactResizeDetector from 'react-resize-detector';
import Link from 'next/link';
import { Grid } from 'react-virtualized';
import { FaArrowRight } from 'react-icons/fa';
import urlRoutes from '../../config/url-routes';
import texts from '../../config/texts';

export default class PatientsGrid extends Component {
    columnWidths = [120, 120, 100, 100, 120, 150, 60, 60, 150, 110, 110, 150, 160, 125, 150, 150, 100, 80, 100, 110, 150, 150, 100, 100, 180, 130, 150, 150]

    render() {
        const { patients } = this.props
        let containerWidth = document.getElementsByClassName('content-container')[0].clientWidth;

        return (
            <ReactResizeDetector handleWidth>
                {({ width }) => 
                    <Grid 
                        className='data-grid centered'
                        cellRenderer={this.cellRenderer.bind(this)}
                        columnCount={this.columnWidths.length}
                        columnWidth={this.getColumnWidths.bind(this)}
                        height={600}
                        rowCount={patients.length + 1}
                        rowHeight={30}
                        width={width || containerWidth}/>}
            </ReactResizeDetector>
        );
    }

    getColumnWidths({ index }) {
        return this.columnWidths[index];
    }

    cellRenderer({columnIndex, key, rowIndex, style}) {
        let patients = this.props.patients;
        let value = '';
        let cellClass = '';
        let keys = Object.keys(patients[0]);
        let isHeader = rowIndex === 0;
        
        if (isHeader) {
            let property = keys[columnIndex + 1];

            cellClass = 'header-cell';
            value = property;
        }
        else {
            let caseUpdate = patients[rowIndex - 1];
            let property = Object.keys(caseUpdate)[columnIndex + 1];

            cellClass = 'data-cell';
            value = caseUpdate[property];
            if (_.isBoolean(value)) {
                value = value ? texts.yes : texts.no;
            }
        }
        
        return (
          <div key={key} style={style} className={cellClass}>
                <label title={value}>{value}</label> 
          </div>
        );
    }
}