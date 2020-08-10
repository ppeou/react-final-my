import makeItSlow from '../utils/make-it-slower';
import {Field} from 'react-final-form';
import React from 'react';

const ButtonAction = ({metaData}, index) => {
  const {label, dataField, eventValue, eventName} = metaData;
  makeItSlow();
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
};

export {ButtonAction};