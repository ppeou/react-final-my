import makeItSlow from '../utils/make-it-slower';
import {Field} from 'react-final-form';
import * as referenceList from "../../store/reference";
import React from 'react';
import Error from './error';

const Dropdown = ({index, classes, getErrorProps, metaData, value, ...props}) => {
  const {label, dataField, refList, refValue, refName} = metaData;
  const list = referenceList[refList];
  makeItSlow();
  return (
    <div key={index} idkey={index} className="component">
      <div className="label">{label}</div>
      <div className="input">
        <select {...props} value={value}>{
          list.map((item, idx) => (<option key={idx} value={item[refValue]}>
            {item[refName]}
          </option>))
        }</select>
      </div>
      <Error name={dataField}/>
    </div>);
};

export default Dropdown;