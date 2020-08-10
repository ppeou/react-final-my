import React from 'react';
import useMyFormField from '../hooks/useMyFormField';
import makeItSlow from '../utils/make-it-slower';
import {Field, useForm, useFormState, useField, FormSpy } from 'react-final-form';

const Group = (props, index) => {
  console.log('group');
  const {change} = useForm();
  const onClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    change('selectedGroup', label);
  };
  const {label} = props.metaData;
  makeItSlow();
  return (<Field name={'selectedGroup'} subscription={{value: true}} key={index}>
    {({input:{value:selectedGroup}}) => {
      const cssClass = ['aside-menu-group'];
      if(selectedGroup === label) {
        cssClass.push('selected');}
      return (<div className={cssClass.join(' ')} key={index}>
        <label onClick={onClick}>{label}</label>
      </div>);
    }}
  </Field>);
};

export default Group;