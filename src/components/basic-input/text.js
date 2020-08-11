import makeItSlow from '../utils/make-it-slower';
import {Field, useField} from 'react-final-form';
import React from 'react';
import Error from './error';
import {useScopedFormField, withField} from '../scope/provider';

const Component = ({index, classes, getErrorProps, metaData, value, ...props}) => {
  const {label, dataField} = metaData;
  makeItSlow();
  return (<div key={index} className="input-text">
    <div className="label">{label}</div>
    <div className="input">
      <input {...props} value={value}/>
    </div>
    <Error name={dataField}/>
  </div>);
}

export default Component;