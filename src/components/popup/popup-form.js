import arrayMutators from "final-form-arrays";
import {Form, FormSpy} from "react-final-form";
import ComponentRender from "../render";
import React from "react";

const Component = ({metaData, items, value, actions, onSubmit}, index) => {
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
          items.map((c, i) => ComponentRender(c, `${index}-${i}`))
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

export default Component;