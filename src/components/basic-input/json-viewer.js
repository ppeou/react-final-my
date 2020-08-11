import React from 'react';
import {MyFormField} from "../index";

const JsonViewer = ({value, index}) => {
  return <pre key={index}>{JSON.stringify(value)}</pre>;
};

export default JsonViewer;