import React from 'react';
import { makeKey } from '../../tools';
import './toggle.css';

const Toggle = ({
  checked, onChange, label, name,
}) => {
  const id = name || makeKey(6);
  return (
    <div className="toggle">
      <div className="inputGroup">
        <input
          id={id}
          name={id}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          tabIndex={0}
        />
        <label htmlFor={id}>{label}</label>
      </div>
    </div>
  );
};

export default Toggle;


/* <div className="toggle-container">
<div className="toggle">
  <input
    type="checkbox"
    id={id}
    checked={checked}
    onChange={onChange}
  />
  <label htmlFor={id}>{label}</label>
  <div className="toggle-label">{label}</div>
</div>

</div> */
