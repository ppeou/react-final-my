import React, {useState} from 'react';
import FormRender, {Error, ScopeData} from './layout-render';
import {Field, Form, FormSpy} from "react-final-form";
import {addressValidator, requiredArray} from './validator';

import arrayMutators from 'final-form-arrays'
import {FieldArray} from 'react-final-form-arrays'

let iid = 0;
const Component = ({metaData, items}, index) => {
  const {label, dataField} = metaData;
  const [open, toggleOpen] = useState(false);

  const onSubmit = (e) => {
    console.log('onSubmit', e);
  };

  const addAddress = (items) => {
    return items.push({id: --iid, city: '', street: ''});
  };

  const onRemoveItem = (e, items) => {
    const {detail: {id, action}} = e;
    if (id !== null && id !== undefined && action === 'remove-row') {
      if (items) {
        console.log('onRemoveItem', items, e.detail);
        items.remove(id);
      }
    }
  };

  const togglePopup = () => {
    toggleOpen(!open);
  };

  const onSaveClick = (onChange, {fieldMountName: value}) => {
    console.log('onSaveClick', value);
    onChange({target: {value}});
    togglePopup();
  };

  return (<section key={index} idkey={index}>
    <button onClick={togglePopup}>Open</button>
    {open && (<div className={`popup ${open ? 'open' : ''}`} key={index} idkey={index}>
      <div className="content">
        <h1><span onClick={togglePopup}>[X]</span> {label}</h1>
        <div className="body">
          <Field name={dataField} subscription={{value: true}}>
            {(props) => {
              const {value: fieldMountName, onChange} = props.input;
              console.log('pros', props);
              return (
                <Form onSubmit={onSubmit}
                      initialValues={{fieldMountName}}
                      mutators={{...arrayMutators}}
                      subscription={{}}>
                  {(props) => {
                    return (
                      <section>
                        <FieldArray name="fieldMountName" validate={addressValidator} subscription={{}}>
                          {
                            ({fields}) => {
                              return (<div onClick={(e) => onRemoveItem(e, fields)}>
                                {
                                  fields.map((name, i) => {
                                    return (<section key={`abc-${i}`}>
                                      {
                                        items.map((c, idx) => {
                                          const {metaData, ...rest} = c;
                                          const {dataField: orgDataField} = metaData;
                                          const dataField = `${name}.${orgDataField}`;
                                          return FormRender({
                                            ...rest,
                                            metaData: {...metaData, dataField, arrayIndex: i}
                                          }, `${index}-${name}-${idx}`);
                                        })
                                      }
                                    </section>);
                                  })
                                }
                                <div className="component">
                                  <div className="label"></div>
                                  <div className="input">
                                    <button type="button" onClick={() => addAddress(fields)}>Add</button>
                                  </div>
                                </div>
                              </div>);
                            }
                          }
                        </FieldArray>
                        <FormSpy subscription={{values: true}}>
                          {
                            ({values}) => {
                              console.log({values});
                              return <button onClick={() => onSaveClick(onChange, values)}>Save</button>;
                            }
                          }
                        </FormSpy>
                      </section>)
                  }}
                </Form>);
            }}
          </Field>
        </div>
      </div>
    </div>)}
  </section>);

};

export default Component;