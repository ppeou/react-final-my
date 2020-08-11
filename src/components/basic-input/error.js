import React from 'react';
import {useScopedFormField} from '../scope/provider';
import makeItSlow from '../utils/make-it-slower';

const Error = ({name}) => {
  const {
    meta: {touched, error}
  } = useScopedFormField(name, {subscription: {touched: true, error: true}});
  makeItSlow();
  return touched && error ? <span className="error">{error}</span> : null;
};

/*const Component = ({ name }) => (
  <Field name={name} subscription={{ error: true, touched: true }}>
    {({ meta: { error, touched } }) =>
      error && touched ? <span className="error">{error}</span> : null
    }
  </Field>
);*/

export default Error;