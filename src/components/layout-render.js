import React, {useCallback, useRef} from "react";
import {Field, Form, FormSpy, useField} from "react-final-form";
import PopUp from './popup';

import {Error, ViewerJson, Section, TextInput, ButtonAction} from './shared-components';
import {
  InputPopupForm, InputFieldArray
} from './form-component';

const renderMap = {
  'input:text': TextInput,
  'input:popup': PopUp,
  'section': Section,
  'button:action': ButtonAction,
  'viewer:json': ViewerJson,
  'input:field-array': InputFieldArray,
  'input:popup-form': InputPopupForm,
};

const Render = (props, index) => {
  const {component, items, metaData, ...rest} = props;
  if (renderMap[component]) {
    return renderMap[component]({component, items, metaData, ...rest}, index);
  } else {
    console.error(component, 'not found');
    return null;
  }
};

const ScopeData = (props) => {
  const {name, children} = props;
  const {input: {value}} = useField(name, {subscription: {value: true}});
  return (<div>{children}</div>);
};

export default Render;
export {ScopeData, Error};
