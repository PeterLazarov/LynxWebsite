import React, { Component } from 'react';
import Link from 'next/link';
import { Grid } from 'react-virtualized';
import { FaArrowRight } from 'react-icons/fa';
import urlRoutes from '../../config/url-routes';

export default class DailyDataGrid extends Component {
    columnWidths = [100, 150, 100, 150]

    render() {
        const { dailyCaseData } = this.props

        return (
            <Grid 
                className='data-grid centered'
                cellRenderer={this.cellRenderer.bind(this)}
                columnCount={Object.keys(dailyCaseData[0]).length - 1}
                columnWidth={this.getColumnWidths.bind(this)}
                height={300}
                rowCount={dailyCaseData.length + 1}
                rowHeight={30}
                width={520}/>
        );
    }

    getColumnWidths({ index }) {
        return this.columnWidths[index];
    }

    cellRenderer({columnIndex, key, rowIndex, style}) {
        let dailyCaseData = this.props.dailyCaseData;
        let value = '';
        let cellClass = '';
        let keys = Object.keys(dailyCaseData[0]);
        let isHeader = rowIndex === 0;
        
        if (rowIndex === 0) {
            let property = keys[columnIndex + 1];

            cellClass = 'header-cell';
            value = property;
        }
        else {
            let region = dailyCaseData[rowIndex - 1];
            let property = Object.keys(region)[columnIndex + 1];

            cellClass = 'data-cell';
            value = region[property];
        }
        
        return (
          <div key={key} style={style} className={cellClass}>
                <label title={value}>{value}</label> 
          </div>
        );
    }
}