import makeItSlow from '../utils/make-it-slower';
import {Field} from 'react-final-form';
import React from 'react';
import Error from './error';

const Component = ({metaData, blurFn}, index) => {
  const {label, dataField} = metaData;
  makeItSlow();
  return (
    <div key={index} idkey={index} className="component">
      <div className="label">{label}</div>
      <div className="input">
        <Field name={dataField} subscription={{value: true}}>
          {({input}) => {
            return (<input {...input}/>)
          }}
        </Field>
      </div>
      <Error name={dataField}/>
    </div>);
}

export default Component;