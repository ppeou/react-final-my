import arrayMutators from "final-form-arrays";
import {Form, FormSpy} from "react-final-form";
import models from "./model";
import {all} from "./validator";
import {FieldArray} from "react-final-form-arrays";
import React from "react";
import Render from "./layout-render";

const InputPopupForm = ({metaData, items, value, actions, onSubmit}, index) => {
  const {forArray} = metaData;
  const hasClosePopup = forArray && actions.togglePopup;
  const formOptions = {
    subscription: {},
    initialValues: {data: value},
    onSubmit
  };

  if (forArray) {
    formOptions.mutators = {...arrayMutators};
  }

  return (<Form {...formOptions} key={index}>
    {(props) => {
      return (<>
        {
          items.map((c, i) => Render(c, `${index}-${i}`))
        }
        <FormSpy subscription={{values: true}}>
          {
            ({values}) => {
              return (<div className="footer-button">
                  <button onClick={() => onSubmit(values.data)}>Save</button>
                  {hasClosePopup && (<button onClick={actions.togglePopup}>Cancel</button>)}
                </div>
              );
            }
          }
        </FormSpy>
      </>)
    }}
  </Form>);
};

const InputFieldArray = ({metaData, items}, index) => {
  const {validator, modelName} = metaData;
  const model = models[modelName];
  const fnValidator = all[validator];

  const onClick = (e, items) => {
    //removeItemByIndex
    const {detail: {eventValue, eventName}} = e;
    if (eventValue !== null && eventValue !== undefined) {
      if (items && eventName === 'removeItemByIndex') {
        console.log('removeItemByIndex', items, e.detail);
        items.remove(eventValue);
      }
    }
  };

  return (<FieldArray name="data" validate={fnValidator} subscription={{}} key={index}>
    {
      ({fields}) => {
        return (<div onClick={(e) => onClick(e, fields)}>
          {
            fields.map((name, i) => {
              return (<section key={`${index}-${i}`}>
                {
                  items.map((c, idx) => {
                    const {metaData, ...rest} = c;
                    const {dataField: orgDataField} = metaData;
                    const dataField = `${name}.${orgDataField}`;
                    return Render({
                      ...rest,
                      metaData: {...metaData, dataField, eventValue: i}
                    }, `${index}-${name}-${idx}`);
                  })
                }
              </section>);
            })
          }
          {<div className="component">
            <div className="label"></div>
            <div className="input">
              <button type="button" onClick={() => fields.push(model.createNewItem())}>Add</button>
            </div>
          </div>}
        </div>);
      }
    }
  </FieldArray>);
};


export {
  InputPopupForm, InputFieldArray
};