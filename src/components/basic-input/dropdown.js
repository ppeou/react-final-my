import makeItSlow from '../utils/make-it-slower';
import {Field} from 'react-final-form';
import * as referenceList from "../../store/reference";
import React from 'react';
import Error from './error';

const Component = ({metaData}, index) => {
  const {label, dataField, refList, refValue, refName} = metaData;
  makeItSlow();
  return (
    <div key={index} idkey={index} className="component">
      <div className="label">{label}</div>
      <div className="input">
        <Field name={dataField} subscription={{value: true}}>
          {props => {
            const list = referenceList[refList];
            return (<select {...props.input} value={props.input.value}>{
              list.map((item, idx) => (<option key={idx} value={item[refValue]}>
                {item[refName]}
              </option>))
            }</select>)
          }
          }
        </Field>
      </div>
      <Error name={dataField}/>
    </div>);
};

export default Component;