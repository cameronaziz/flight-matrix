import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './dropdown.css';


const MultiSelect = ({ choices, label }) => {
  const [open, setOpen] = useState(false);
  const [selection, setSelection] = useState(null);

  const select = (e, value) => {
    // e.stopPropagation();
    setSelection(value);
  };

  const liStyle = {
    className: open ? '' : 'closed',
    top: (i) => {
      if (open) {
        return `${(i + 1) * 40}px`;
      }
      return '0px';
    },
  };

  const selectLabel = () => {
    if (selection || selection === 0) {
      if (typeof choice === 'string') {
        return choices[selection];
      }
      return choices[selection].label;
    }
    if (label) {
      return label;
    }
    return 'Select';
  };

  return (
    <div className="dropdown-wrapper">
      <div
        tabIndex={0}
        role="button"
        className="card-drop"
        onClick={() => setOpen(!open)}
        onKeyDown={() => setOpen(!open)}
      >
        <a className={`toggle${open ? ' open' : ''}`} href="#">
          <span className="label-active">{selectLabel()}</span>
        </a>
        <ul>
          {choices.map((choice, i) => {
            let { value, label: choiceLabel } = choice;
            if (typeof choice === 'string') {
              value = choice;
              choiceLabel = choice;
            }
            return (
              <li
                className={`${i === selection ? 'active' : ''} ${liStyle.className}`}
                style={{
                  zIndex: 5,
                  left: 0,
                  top: liStyle.top(i),
                }}
              >
                <a className="select-item" data-label="Everyting" href="#" onClick={e => select(e, i)}>
                  {choiceLabel}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

MultiSelect.propTypes = {
  label: PropTypes.string,
  choices: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
        PropTypes.number,
      ]),
      label: PropTypes.string,
    }),
  ])).isRequired,
};

MultiSelect.defaultProps = {
  label: undefined,
};

export default MultiSelect;
