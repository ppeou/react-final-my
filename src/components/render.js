import React from 'react';
import PopUp from './popup/popup';
import {get} from 'lodash';
import {withScope} from './scope/provider';

import {
  AsideMenu,
  Group,
  ViewerJson,
  Section,
  TextInput,
  ButtonAction,
  Dropdown, withDataField,
  InputPopupForm, InputFieldArray
} from './index';

const componentNameMap = {
  'aside-menu': AsideMenu,
  'input:text': TextInput,
  'input:dropdown': Dropdown,
  'input:popup': PopUp,
  'group': Group,
  'section': Section,
  'button:action': ButtonAction,
  'viewer:json': ViewerJson,
  'input:field-array': InputFieldArray,
  'input:field-array-with-data-field': withDataField(InputFieldArray),
  'input:popup-form': InputPopupForm,
};

const Render = (props, index) => {
  const component = props.component;
  const scope = get(props, 'metaData.scope', null);
  let useWithScope = !!scope;
  //console.log(component, rest);
  if (componentNameMap[component]) {
    return useWithScope ? withScope(scope)(componentNameMap[component])(props, index)
    : componentNameMap[component](props, index);
  } else {
    console.error(component, 'not found');
    return null;
  }
};

const LayoutRender = ({layout, index}) => {
  return Render(layout, index);
};

const MemoLayoutRender = React.memo(LayoutRender);
//<MemoRenderComponent layout={topLayout} index="profile-page-top"/>
//<MemoRenderComponent layout={asideLayout} index="profile-page-aside"/>


export default Render;
export { MemoLayoutRender};
