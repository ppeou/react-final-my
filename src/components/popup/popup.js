import React, {useState} from 'react';
import ComponentRender from '../render';
import {Field} from 'react-final-form';

const Component = ({metaData, items}, index) => {
  const {label, dataField, popupButtonLabel} = metaData;
  const [open, toggleOpen] = useState(false);

  const togglePopup = () => {
    toggleOpen(!open);
  };

  const onSaveClick = (onChange) => {
    return (value) => {
      console.log('onSaveClick', value);
      onChange({target: {value}});
      togglePopup();
    }
  };

  const actions = {togglePopup};

  return (<section key={index}>
    <button onClick={togglePopup}>{popupButtonLabel}</button>
    {open && (<div className={`popup ${open ? 'open' : ''}`} key={index}>
      <div className="content">
        <h1>{label}</h1>
        <div className="body">
          <Field name={dataField} subscription={{value: true}}>
            {({input: {value, onChange}}) => {
              const onSubmit = onSaveClick(onChange);
              console.log('pros', open, value);
              return (<>
                {
                  items.map((c, i) => ComponentRender({...c, value, onSubmit, actions}, `${index}-${i}`))
                }
                </>);
            }}
          </Field>
        </div>
      </div>
    </div>)}
  </section>);

};

export default Component;