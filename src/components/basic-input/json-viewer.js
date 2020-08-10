import React from 'react';
import {MyFormField} from "../index";

const Component = ({metaData, value}, index) => {
  return <MyFormField name={metaData.dataField} key={index}>
    {
      ({value}) => {
        return (<pre key={index}>{JSON.stringify(value)}</pre>);
      }
    }
  </MyFormField>;
};

export default Component;