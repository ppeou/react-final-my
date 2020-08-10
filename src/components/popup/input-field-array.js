import models from "../model";
import {all} from "../validator";
import {FieldArray} from "react-final-form-arrays";
import ComponentRender from "../render";
import React from "react";

const Component = ({metaData, items}, index) => {
  const {validator, modelName, flexLayout} = metaData;
  const cssClass = [];
  if(flexLayout) {cssClass.push(flexLayout);}
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
  console.log('index', index);
  return (<FieldArray name="data" validate={fnValidator} subscription={{}} key={index}>
    {
      ({fields}) => {
        return (<div className={cssClass.join(' ')} onClick={(e) => onClick(e, fields)}>
          {
            fields.map((name, i) => {
              return (<section key={`${index}-${i}`}>
                {
                  items.map((c, idx) => {
                    const {metaData, ...rest} = c;
                    const {dataField: orgDataField} = metaData;
                    const dataField = `${name}.${orgDataField}`;
                    return ComponentRender({
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


export default Component;