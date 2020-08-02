const AddressModel = () => {
  let iid = 0;
  const createNewItem = () => ({id: --iid, city: '', street: ''});
  return {createNewItem};
};

const models = {
  address: AddressModel()
};

export default models;




