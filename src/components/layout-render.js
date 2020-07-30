import React, {useCallback, useRef} from "react";
import {Field, useField} from "react-final-form";
import PopUp from './popup';

import {Error, ViewerJson, Section, TextInput, ButtonAction} from './share-components';

const renderMap = {
  'input:text': TextInput,
  'input:popup': PopUp,
  'form': Section,
  'button:action': ButtonAction,
  'viewer:json': ViewerJson,
};

const Render = (props, index) => {
  const {component, items, metaData} = props;
  if (renderMap[component]) {
    return renderMap[component]({component, items, metaData}, index);
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
