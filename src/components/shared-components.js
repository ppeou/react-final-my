import {Field, useField} from "react-final-form";
import React from "react";
import Render from "./layout-render";

/*const Error = ({ name }) => (
  <Field name={name} subscription={{ error: true, touched: true }}>
    {({ meta: { error, touched } }) =>
      error && touched ? <span className="error">{error}</span> : null
    }
  </Field>
);*/

const Error = ({name}) => {
  const {
    meta: {touched, error}
  } = useField(name, {subscription: {touched: true, error: true}});
  return touched && error ? <span className="error">{error}</span> : null;
};

const MyFormField = ({name, children}) => {
  const {input: {value}} = useField('', {subscription: {value: true}});
  if (typeof children === 'function')
    return children && children({value});
};

const ViewerJson = ({metaData, value}, index) => {
  return <MyFormField name={metaData.dataField} key={index}>
    {
      ({value}) => {
        return (<pre key={'ac'}>{JSON.stringify(value)}</pre>);
      }
    }
  </MyFormField>;
};



const Section = ({metaData, items}, index) => {
  return (<div className="section" key={index} idkey={index}>
    {
      items.map((c, idx) => Render(c, `${index}-${idx}`))
    }
  </div>);
};

const TextInput = ({metaData}, index) => {
  const {label, dataField} = metaData;
  const loop = 10000 * 10000;
  for (let i = 0; i < loop; i++) ;
  return (
    <div key={index} idkey={index} className="component">
      <div className="label">{label}</div>
      <div className="input">
        <Field name={dataField} subscription={{value: true}}>
          {props => (
            <input {...props.input} />
          )}
        </Field>
      </div>
      <Error name={dataField}/>
    </div>);
}

const onclickGenerator = (myInput) => {
  return (e, id) => {
    e.stopPropagation();
    e.preventDefault();
    if (myInput.current) {
      console.log('id', id);
      const event = new CustomEvent('click', {detail: {id}, bubbles: true, cancelable: true});
      console.log(myInput.current);
      myInput.current.dispatchEvent(event);
    }
  };
};


const ButtonAction = ({metaData}, index) => {
  const {label, dataField, eventValue, eventName} = metaData;
  const loop = 10000 * 10000;
  for (let i = 0; i < loop; i++) ;
  const onClick = (e, value) => {
    e.stopPropagation();
    e.preventDefault();
    const detail = eventName ? {eventValue, eventName} : {eventValue: value, eventName: 'click'};
    const event = new CustomEvent('click', {detail, bubbles: true, cancelable: true});
    e.target.parentElement.dispatchEvent(event);
  };
  return (
    <div key={index} idkey={index}>
      <Field name={dataField} subscription={{value: true}}>
        {props => (
          <button type="button" onClick={(e) => {
            onClick(e, props.input.value)
          }}>{label}</button>
        )}
      </Field>
    </div>);
}

export {
  Error, MyFormField, ViewerJson, Section, TextInput, ButtonAction
}