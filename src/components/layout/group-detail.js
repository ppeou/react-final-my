import React, {useMemo} from 'react';
import {get} from 'lodash';
import {Form, Field, FormSpy, useForm, useField} from 'react-final-form';
import data from '../../mock/data.json';
import makeItSlow from '../utils/make-it-slower';
import findLayout from '../utils/find-layout';
import ComponentRender from '../render';
import useMyFormField from '../hooks/useMyFormField';
import {withField, useScopeForm, useScopeFormState, ScopeProvider} from '../scope/provider';

const GroupDetail = ({layout, index}) => {
  console.log('group-detail');
  const cssClass = ['group-detail'];
  const selectedGroup = useScopeFormState({dataField: 'data.selectedGroup'});
  const {metaData, items} = useMemo(() => {
    return findLayout({component: 'group', 'metaData.label': selectedGroup}, layout) || {metaData: {}, items: []};
  }, [selectedGroup]);
  makeItSlow();
  return (
    <ScopeProvider scope={metaData.scope}>
      <div key={index}>
        <h2>{selectedGroup}</h2>
        {
          items.map((c, idx) => ComponentRender(c, `group-detail-${idx}`))
        }
      </div>
    </ScopeProvider>
  );
};

export default GroupDetail;