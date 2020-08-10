import React from 'react';

if (process.env.NODE_ENV === 'development') {
  const {whyDidYouUpdate} = require('why-did-you-update');
  //whyDidYouUpdate(React, { include: [/^pure/], exclude: [/^Connect/] });
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
    trackAllPureComponents: true,
  });
}