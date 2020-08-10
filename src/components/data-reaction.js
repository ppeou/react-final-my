import createDecorator from 'final-form-calculate';

const revenue = {
  field: /properties/,
  updates: {
    revenue: (ignoredValue, {properties}) => {
      console.log({ignoredValue, properties});
      return properties.reduce((p,{revenue}) => p + Number(revenue), 0);
    }
  }
};

const ProfileDataReaction = createDecorator(revenue);

const DataReaction = {ProfileDataReaction};

export {DataReaction};