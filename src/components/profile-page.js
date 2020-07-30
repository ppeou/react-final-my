import React from 'react';
import {Form, FormSpy} from 'react-final-form';
import {profileValidator} from './validator';
import data from './data.json';
import layout from './layout.json';
import Render from './layout-render';
import Popup from './popup';

const Component = () => {
  console.log('profile-page');
  const onSubmit = (e) => {
    console.log('onSubmit', e);
  };
  return (<div key="profile-page">
    <Form onSubmit={onSubmit}
          initialValues={data}
          validate={profileValidator}
          subscription={{}}>
      {(props) => {
        return (<>

            <div>
              {
                Render(layout, 'profile-page', props.form)
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
/*
<tr>
                  <td>Name:</td>
                  <td>
                    <Field name="name">
                      {props => (
                        <div>
                          <input {...props.input} />
                        </div>
                      )}
                    </Field>
                  </td>
                </tr>
                <tr>
                  <td>Phone:</td>
                  <td>
                    <Field name="phone">
                      {props => (
                        <div>
                          <input {...props.input} />
                        </div>
                      )}
                    </Field>
                  </td>
                </tr>
                <tr>
                  <td>Email:</td>
                  <td>
                    <Field name="email">
                      {props => (
                        <div>
                          <input {...props.input} />
                        </div>
                      )}
                    </Field>
                  </td>
                </tr>
*/