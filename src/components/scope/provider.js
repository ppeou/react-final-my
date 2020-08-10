import React, {createContext, useContext} from 'react';


export const Context = createContext();


const Scope = ({children, scope, shouldInterhitScope = true}) => {
  const parentScope = useContext(Context);

  const fullScope = parentScope && shouldInterhitScope ? `${parentScope}.${scope}` : scope;

  return (<Context.Provider value={fullScope}>
    {children}
  </Context.Provider>);
};

const withScope = (scope) => (Component) => {
  const ComponentWithScope = ({children, ...props}) => {
    return (<Scope scope={scope}>
      <Component {...props}>{children}</Component>
    </Scope>);
  };
  return ComponentWithScope;
};

export {Scope, withScope}