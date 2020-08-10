import {useField} from 'react-final-form';
import {get} from 'lodash';

const useHook  = (field) => {
  const {input:{value}} = useField (field, {subscription: {value: true}});
  return value;
};

export default useHook;