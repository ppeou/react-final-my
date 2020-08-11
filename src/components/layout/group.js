import React from 'react';
import makeItSlow from '../utils/make-it-slower';
import {useScopeForm, useScopeFormState} from '../scope/provider';

const Group = ({index, metaData}) => {
  console.log('group');
  const {change} = useScopeForm();
  const selectedGroup = useScopeFormState({dataField: 'data.selectedGroup'});
  console.log('selectedGroup', selectedGroup);
  const onClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    console.log(label);
    change([{dataField: 'selectedGroup', value: label}]);
  };
  const {label} = metaData;
  const cssClass = ['aside-menu-group'];
  if(selectedGroup === label) {
    cssClass.push('selected');}
  makeItSlow();
  return (<div className={cssClass.join(' ')} key={index}>
    <label onClick={onClick}>{label}</label>
  </div>);
};

export default Group;