import {get} from 'lodash';

const findLayout = (criteria, layout) => {

  const {items = []} = layout;

  const match = Object.keys(criteria).every(k => criteria[k] === get(layout, k));
  if(match) {
    return layout;
  } else {
    for(let i = 0; i < items.length; i++) {
      const subLayout = items[i];
      const found = findLayout(criteria, subLayout);
      if(found) {
        return found;
      }
    }
    return false;
  }
};

export default findLayout;