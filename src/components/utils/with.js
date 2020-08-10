import {Field, Form, FormSpy, useField, useForm} from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import {get} from 'lodash';
import React from 'react';

const withDataField = (Component) => {
  return ({metaData, ...rest}, index) => {
    const {dataField} = metaData;
    return (
      <Field name={dataField} subscription={{value: true}} key={index}>
        {({input: {value, onChange}}) => {
          const onSubmit = ({data: value}) => {
            console.log('withDataField::onSubmit', value);
            onChange({target: {value}});
          };
          const formOptions = {
            subscription: {},
            initialValues: {data: value},
            mutators: {...arrayMutators},
            onSubmit
          };
          return (
            <Form {...formOptions}>
              {() => {
                return (<>
                  <Component metaData={metaData} {...rest} index={`${index}`}/>
                  <FormSpy subscription={{values: true, dirtyFields: true}} originalValue={value}>
                    {
                      ({values: {data: values}, dirtyFields, originalValue, form}) => {
                        console.log('abc', values, originalValue);
                        const fieldPrefix = 'data';
                        const changedItems = Object.keys(dirtyFields).filter(field => {
                          if (field !== fieldPrefix) {
                            const tempField = field.substr(fieldPrefix.length).replace(/[[,\]]/g, '');
                            const [a, b] = [get(values, tempField), get(originalValue, tempField)];
                            return a !== b;
                          }
                          return false;
                        });
                        if (changedItems.length > 0) {
                          //form.submit(values);
                        }
                        return null;
                      }
                    }
                  </FormSpy>
                </>);
              }}
            </Form>);
        }}
      </Field>);
  };
};

const useScopeField = (fieldName, initialValue) => {
  const {meta, input, ...fieldState} = useField(fieldName, {initialValue});
  return {meta, input, ...fieldState};
}

const useScope = (scopeName, initialValue) => {
  const form = useForm(scopeName);
  const {batch, change, getState, subscribe} = form;
  return useScopeField;
};

export {withDataField, useScope};