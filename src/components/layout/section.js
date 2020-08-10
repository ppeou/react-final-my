import Render from "../render";
import React from 'react';
import makeItSlow from '../utils/make-it-slower';

const Component = ({metaData = {}, items}, index) => {
  const {flexLayout} = metaData;
  const cssClass = ['section'];
  if (flexLayout) {
    cssClass.push(flexLayout);
  }
  makeItSlow();
  return (<div className={cssClass.join(' ')} key={index}>
    {
      items.map((c, idx) => Render(c, `${index}-${idx}`))
    }
  </div>);
};

export default Component;