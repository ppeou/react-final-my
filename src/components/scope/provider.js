import React, {useMemo, createContext, useContext, useCallback} from 'react';
import {get} from 'lodash';
import {useField, useForm, useFormState } from 'react-final-form';


const ScopeContext = createContext();

const ScopeProvider = ({children, scope, shouldInterhitScope = true}) => {
  const parentScope = useContext(ScopeContext);

  const fullScope = parentScope && shouldInterhitScope ? `${parentScope}.${scope}` : scope;

  return (<ScopeContext.Provider value={fullScope}>
    {children}
  </ScopeContext.Provider>);
};

let iikey = 0;
const withScope = (scopeName) => (Component) => {
  const ComponentWithScope = ({children, ...props}) => {
    console.log('scopeName', scopeName);
    return (<ScopeProvider scope={scopeName} key={iikey++}>
      <div scope-name={`scope-${scopeName}`}>
      <Component {...props}>{children}</Component>
      </div>
    </ScopeProvider>);
  };
  return ComponentWithScope;
};

const getScopedFieldName = (scopeName, fieldName) =>
  [scopeName, fieldName].filter(a => a).join('.');

const createGetFromState = scopeName => (state, stateName) =>
  get(state, getScopedFieldName(stateName, scopeName));

const getScopedState = (scopeName, state) => {
  const getFromState = createGetFromState(scopeName);

  return {
    ...state,
    ...[
      'dirtyFields', 'errors', 'initialValues',
      'modified', 'touched', 'values', 'visited'
    ].map(name => getFromState(state, name))
  };
};

const useScopeFormState = (fieldName, fieldProps = {subscription: {values: true}}) => {
  const scopeName = useContext(ScopeContext);
  const fullName = typeof fieldName === 'string' ? getScopedFieldName(scopeName, fieldName): fieldName.dataField;
  const {values} = useFormState (fullName, fieldProps);
  return get(values, fullName);

};

const useScopeForm = () => {
  const scopeName = useContext(ScopeContext);
  const {change, getState, ...formApi} = useForm();
  window.getState = getState;
  return {
    ...formApi,
    change: (name, value) => {
      if(typeof name === 'string') {
        change(getScopedFieldName(scopeName, name), value);
      } else if(Array.isArray(name)) {
        name.forEach(({dataField, value}) => {
          change(`data.${dataField}`, value);
        });
      }
    },
    getState: () => getScopedState(scopeName, getState())
  }
};


const useScopedFormField = (fieldName, fieldProps = {subscription: {value: true}}) => {
  const scopeName = useContext(ScopeContext);
  const fullName = getScopedFieldName(scopeName, fieldName);
  return useField(fullName, fieldProps);
};

const normalizeEventHandler = (...handlers) => e => {
  handlers.forEach(handler => handler && handler(e));
};

const normalizedInputEventHandlers = (props1, props2) => {
  return {
    onBlur: normalizeEventHandler(props1.onBlur, props2.onBlur),
    onChange: normalizeEventHandler(props1.onChange, props2.onChange),
    onFocus: normalizeEventHandler(props1.onFocus, props2.onFocus),
  }
};

const getErrorProps = ({
                         error, submitError, submitFailed, submitSucceeded, touched
                       }) => (shouldAlwaysShowError = false) => {
  const hasError = (submitError || submitFailed || submitSucceeded || touched || shouldAlwaysShowError) && !!error;

  return {
    helperText: hasError ? error : undefined,
    validationState: hasError ? 'error' : undefined
  };
};

const withField = (Component, options = {}) => {
  //console.log('withField');
  const ComponentWithField = ({metaData = {}, ...props}) => {
    const {dataField} = metaData;
    const name = dataField === '.' ? false : dataField || null;
    //console.log('ComponentWithField', name);
    //console.log(props.component);
    //const {input, meta} = {input: {}, meta: {}};
    const {input, meta} = useScopedFormField(name, {
      subscription: !!name ? {
        error: true,
        submitError: true,
        submitFailed: true,
        submitSucceeded: true,
        touched: true,
        value: true
      } : {value: false},
      ...options
    });

    const errorProps = useCallback(showAlwaysShow => {
      if (!dataField) {
        return {helperText: 'FIELD_NOT_MAPPED', validationState: 'warning'};
      }
      return getErrorProps(meta)(showAlwaysShow);
    }, [dataField, meta]);
    const memoizedMetadata = useMemo(() => ({...metaData, readOnly: metaData.readOnly || !dataField}), [metaData])


    return (<Component
      {...props}
      {...input}
      {...normalizedInputEventHandlers(props, input)}
      getErrorProps={errorProps}
      metaData={memoizedMetadata}
    ></Component>)
  };

  return ComponentWithField;
};

export {
  ScopeContext,
  ScopeProvider,
  withScope,
  withField,
  useScopeForm,
  useScopeFormState,
  useScopedFormField
};