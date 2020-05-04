import React, { Component } from 'react';
import Link from 'next/link';
import { Grid } from 'react-virtualized';
import { FaArrowRight } from 'react-icons/fa';
import urlRoutes from '../../config/url-routes';
import texts from '../../config/texts';

export default class CaseUpdatesGrid extends Component {
    columnWidths = [110, 100, 110, 120, 110, 100, 100, 50, 70, 150, 100, 90, 80, 110, 250, 800, 200, 200]

    render() {
        const { caseUpdates } = this.props

        return (
            <Grid 
                className='data-grid centered'
                cellRenderer={this.cellRenderer.bind(this)}
                columnCount={this.columnWidths.length}
                columnWidth={this.getColumnWidths.bind(this)}
                height={300}
                rowCount={caseUpdates.length + 1}
                rowHeight={30}
                width={window.innerWidth}/>
        );
    }

    getColumnWidths({ index }) {
        return this.columnWidths[index];
    }

    cellRenderer({columnIndex, key, rowIndex, style}) {
        let caseUpdates = this.props.caseUpdates;
        let value = '';
        let cellClass = '';
        let keys = Object.keys(caseUpdates[0]);
        let isHeader = rowIndex === 0;
        let isLastColumn = columnIndex === (this.columnWidths.length - 1);
        
        if (isHeader) {
            let property = keys[columnIndex + 1];

            cellClass = 'header-cell';
            value = property;
        }
        else {
            let caseUpdate = caseUpdates[rowIndex - 1];
            let property = Object.keys(caseUpdate)[columnIndex + 1];

            cellClass = 'data-cell';
            value = caseUpdate[property];
            if (_.isBoolean(value)) {
                value = value ? texts.yes : texts.no;
            }
            // console.log(property, value);
        }
        
        return (
          <div key={key} style={style} className={cellClass}>
                {(isHeader || !isLastColumn) &&
                    <label title={value}>{value}</label> }
                {!isHeader && isLastColumn &&
                    <a title={value} href={value}>{value}</a> }
          </div>
        );
    }
}