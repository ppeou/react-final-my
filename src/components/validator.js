const name = (value) => !!value;
const email = (value) => !!value && value.indexOf('@') > -1;

const city = (value) => !!value;
const street = (value) => !!value;

const createValidator = (field, validate, errorMessage) => {
  return {field, validate, errorMessage}
};

const profilesRule = [
  createValidator('name', name, 'Invalid name'),
  createValidator('email', email, 'Invalid email')
];

const addressRules = [
  createValidator('street', street, 'Invalid street'),
  createValidator('city', city, 'Invalid city')
];

const validator = (rules) => {
  return (values, allValues) => {
    const errors = rules.reduce((p, {field, validate, errorMessage}) => {
      if (validate(values[field]) !== true) {
        p[field] = errorMessage;
      }
      return p;
    }, {});
    return errors;
  }
};
const validatorForArray = (rules) => {
  return (values) => {
    const errors = [];
    values.forEach((value, index) => {
      rules.reduce((p, {field, validate, errorMessage}) => {
        if(!p[index]) {p.push({})}
        if (validate(value[field]) !== true) {
          p[index][field] = errorMessage;
        }
        return p;
      }, errors);
    });
    return errors;
  }
};
const profileValidator = validator(profilesRule);
const addressValidator = validatorForArray(addressRules);
const requiredArray = value => value && value.length > 0 ? undefined : 'Required';

export default validator;
const all = {
  addressValidator
};
export {
  profileValidator,
  addressValidator,
  requiredArray,
  all
}