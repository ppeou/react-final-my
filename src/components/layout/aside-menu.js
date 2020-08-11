import React, {useCallback, useMemo} from 'react';
import ComponentRender from '../render';
import makeItSlow from '../utils/make-it-slower';

const Abc = ({layout, index}) => {
  return ComponentRender(layout, index);
};

const MemoAbc = React.memo(Abc);


const AsideMenu = ({index, items}) => {
  const cssClass = ['aside-menu'];
  makeItSlow();
  return (<aside className={cssClass.join(' ')} key={index}>
      {
        items.map((c, idx) => ComponentRender(c, `${index}-${idx}`))
      }
    </aside>);
};
AsideMenu.whyDidYouRender = true;
export default AsideMenu;