import {withField} from './scope/provider';
import * as Components from './index';

const {
  GroupDetail
} = Components;

const {
  TextInput,
  AsideMenu,
  Error,
  Section,
  Dropdown,
  withDataField,
  MyFormField,
  ViewerJson,
  ButtonAction,
  InputPopupForm, InputFieldArray,
  Group,
} = Object.keys(Components).reduce((p, k) => {
  p[k] = withField(Components[k]);
  return p;
}, {});

export {
  AsideMenu,
  Error,
  MyFormField,
  ViewerJson,
  Section,
  TextInput,
  ButtonAction, Dropdown, withDataField,
  InputPopupForm, InputFieldArray,
  Group,
  GroupDetail
};