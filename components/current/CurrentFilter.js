import React, { Component } from 'react';
import texts from '../../config/texts';

export default class CurrentFilter extends Component {
    render() {
        const { props } = this;
        const { filter } = props;

        return (
            <div className='form centered'>
                <div className='form-row'>
                    <input 
                        type='text' 
                        placeholder={texts.region} 
                        className='input full-width'
                        defaultValue={filter.region}
                        onInput={(e) => props.onFilterChange({
                            ...filter,
                            region: e.target.value
                        })} />
                </div>
                <div className="form-row">
                    <input 
                        type='text' 
                        placeholder={texts.province} 
                        className='input full-width' 
                        defaultValue={filter.province}
                        onInput={(e) => props.onFilterChange({
                            ...filter,
                            province: e.target.value
                        })} />
                </div>
            </div>
        );
    }
}