import React, { Component } from 'react';
import Link from 'next/link';
import { Grid } from 'react-virtualized';
import { FaArrowRight } from 'react-icons/fa';
import urlRoutes from '../../config/url-routes';

export default class CurrentGrid extends Component {
    columnWidths = [70, 150, 200, 80, 80, 150 ,150, 50]

    render() {
        const { regionData } = this.props

        return (
            <Grid 
                className='data-grid centered'
                cellRenderer={this.cellRenderer.bind(this)}
                columnCount={Object.keys(regionData[0]).length}
                columnWidth={this.getColumnWidths.bind(this)}
                height={300}
                rowCount={regionData.length + 1}
                rowHeight={30}
                width={938}/>
        );
    }

    getColumnWidths({ index }) {
        return this.columnWidths[index];
    }

    cellRenderer({columnIndex, key, rowIndex, style}) {
        let data = this.props.regionData;
        let value = '';
        let cellClass = '';
        let keys = Object.keys(data[0]);
        let isLastColumn = columnIndex === (keys.length - 1);
        let isHeader = rowIndex === 0;
        let currentData = null;
        
        if (isHeader) {
            let property = keys[columnIndex];

            cellClass = 'header-cell';
            if (!isLastColumn){
                value = property;
            }
        }
        else {
            currentData = data[rowIndex - 1];
            let property = Object.keys(currentData)[columnIndex];

            cellClass = 'data-cell';
            value = currentData[property];
        }
        
        return (
          <div key={key} style={style} className={cellClass}>
            {!isHeader && isLastColumn && 
                <Link href={{ pathname: urlRoutes.DAILY_DATA, query: { 
                    region: currentData.region, 
                    province: currentData.province 
                }}}>
                    <a className='grid-link-button'><FaArrowRight /></a>
                </Link>}
            {!isLastColumn && 
                <label title={value}>{value}</label> }
          </div>
        );
    }
}