import {useField} from 'react-final-form';
import React from 'react';
import makeItSlow from '../utils/make-it-slower';

const Component = ({name}) => {
  const {
    meta: {touched, error}
  } = useField(name, {subscription: {touched: true, error: true}});
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

export default Component;