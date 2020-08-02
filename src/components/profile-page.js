import React from 'react';
import {Form, FormSpy} from 'react-final-form';
import {profileValidator} from './validator';
import data from './data.json';
import layout from './layout.json';
import LayoutRender from './layout-render';

const Component = () => {
  console.log('profile-page');
  const onSubmit = (e) => {
    console.log('onSubmit', e);
  };
  const formOptions = {
    onSubmit,
    initialValues: data,
    validate: profileValidator,
    subscription: {}
  };
  return (<div key="profile-page">
    <Form {...formOptions}>
      {(props) => {
        return (<>
            <div>
              {
                LayoutRender(layout, 'profile-page', props.form)
              }
            </div>
            <FormSpy subscription={{valid: true, submitting: true, pristine: true, values: true}}>
              {
                ({valid, submitting, values, form, pristine}) => {
                  return (<div className="component">
                    <div className="label"></div>
                    <div className="input">
                      <button type="submit" disabled={submitting || pristine || !valid}>
                        Submit
                      </button> <button
                        type="button"
                        onClick={form.reset}
                        disabled={submitting || pristine}
                      >
                        Reset
                      </button>
                    </div>
                  </div>);
                }
              }
            </FormSpy>
          </>
        )
      }}
    </Form>
  </div>);

};

export default Component;