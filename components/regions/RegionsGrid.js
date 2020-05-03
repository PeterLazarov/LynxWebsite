import React, { Component } from 'react';
import Link from 'next/link';
import { Grid } from 'react-virtualized';
import { FaArrowRight } from 'react-icons/fa';
import urlRoutes from '../../config/url-routes';

export default class RegionsGrid extends Component {
    columnWidths = [70,200, 70, 80, 200, 150 ,100, 50]

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
        let regionData = this.props.regionData;
        let value = '';
        let cellClass = '';
        let keys = Object.keys(regionData[0]);
        let isLastColumn = columnIndex === (keys.length - 1);
        let isHeader = rowIndex === 0;
        
        if (rowIndex === 0) {
            let property = keys[columnIndex];

            cellClass = 'header-cell';
            if (!isLastColumn){
                value = property;
            }
        }
        else {
            let region = regionData[rowIndex - 1];
            let property = Object.keys(region)[columnIndex];

            cellClass = 'data-cell';
            value = region[property];
        }
        
        return (
          <div key={key} style={style} className={cellClass}>
            {!isHeader && isLastColumn && 
                <Link href=''><a className='grid-link-button'><FaArrowRight /></a></Link>}
            {!isLastColumn && 
                <label title={value}>{value}</label> }
          </div>
        );
    }
}