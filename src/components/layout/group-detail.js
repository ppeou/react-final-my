import React from 'react';
import {get} from 'lodash';
import {Form, Field, FormSpy, useForm} from 'react-final-form';
import data from '../../mock/data.json';
import makeItSlow from '../utils/make-it-slower';
import findLayout from '../utils/find-layout';
import ComponentRender from '../render';
import useMyFormField from '../hooks/useMyFormField';

const Scope = (props) => {
  const {scope: {name: scopeName, data: scopeData, change: scopeChange}, children} = props;
  const onSubmit = () => {};

  const options = {
    onSubmit,
    initialValues: scopeData,
    subscription: {}
  };

  return (<Form {...options}>
    {(formProps) => {
      return (<>
        {children}
        <FormSpy subscription={{dirty: true, values: true}}>
          {(all) => {
            console.log(all);
            return null;
          }}
        </FormSpy>
        </>);
    }}
  </Form>);
};

const GroupDetail = ({layout}, index) => {
  const {change} = useForm();
  console.log('group-detail');
  const cssClass = ['group-detail'];
  makeItSlow();
  return (<Field subscription={{value: true}}>
    {({input:{value}}) => {
      const {selectedGroup} = value;
      const {metaData, items} = findLayout({component: 'group','metaData.label': selectedGroup}, layout) || {metaData: {}, items: []};
      const scope = {name: metaData.scope,
        data: get(value, metaData.scope),
        change,
      };
      return (<Scope scope={scope} index={index}>
        <h2>{selectedGroup}</h2>
        {
          items.map((c, idx) => ComponentRender(c, `group-detail-${idx}`))
        }
      </Scope>);
    }}
  </Field>);
};

export default GroupDetail;