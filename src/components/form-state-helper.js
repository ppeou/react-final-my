import {useForm} from 'react-final-form';
import {get} from 'lodash';

const useStateField = (field) => {
  const {getState} = useForm();
  return get('field', getState());
};

export {useStateField};