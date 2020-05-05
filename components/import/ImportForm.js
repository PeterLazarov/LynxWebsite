import React, { Component } from 'react';
import _ from 'lodash';
import ImportType from './ImportType';
import helper from '../../utils/helper';
import urlRoutes from '../../config/url-routes';
import enumTexts from '../../config/enumTexts';
import texts from '../../config/texts';

export default class RegisterForm extends Component {
    state = {
        file: null,
        importType: ImportType.data,
    }

    render() {
        return (
            <div className='form centered'>
                <div className="form-row">
                    <label className="label left-float">{texts.importType}:</label>
                    <select className="select" 
                        onChange={(e) => {
                            this.setState({
                                importType: e.target.value
                            });
                        }}>
                        {_.map(ImportType, type => 
                            <option value={type} key={type}>{enumTexts[type]}</option>
                        )}
                    </select>
                    
                </div>
                <div className="form-row">
                    <label className="label left-float">{texts.file}</label>
                    {this.state.file && 
                        <label className="label right-float">{this.state.file.name}</label>
                    }
                </div>

                <div className="form-row">
                    <input 
                        type='file' 
                        name="csvImport" id="csvImport" 
                        className="csv-import-input"
                        onInput={(e) => {
                            let file = e.target.files[0];
                            this.setState({
                                file: file
                            });
                        }} />
                    <label htmlFor="csvImport" className="half-width left-float">{texts.uploadCSV}</label>

                    <input 
                        type='button' 
                        value={texts.import} 
                        disabled={!this.state.file}
                        className='button half-width right-float' 
                        onClick={this.onTryImport.bind(this)}/>
                </div>
            </div>
        );
    }

    isValid() {
        return !_.isNull(this.state.file);
    }

    onTryImport() {
        const { state } = this;
        if (this.isValid()) {
            this.props.onImport(state.file, state.importType);
        }
        else {
            this.setState({
                fileError: true
            });
        }
    }
}