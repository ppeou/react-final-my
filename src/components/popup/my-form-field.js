import {useField} from 'react-final-form';

const Component = ({name, children}) => {
  const {input: {value}} = useField('', {subscription: {value: true}});
  if (typeof children === 'function')
    return children && children({value});
};

export default Component;