import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './dropdown.css';


const Dropdown = ({ choices, label }) => {
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
        style={{ height: '40px' }}
      >
        <a className={`toggle${open ? ' open' : ''}`} href="#">
          <span className="label-active">{selectLabel()}</span>
        </a>
        <div className="cover"></div>
        <ul>
          {choices.map((choice, i) => {
            let { value, label: choiceLabel } = choice;
            if (typeof choice === 'string') {
              value = choice;
              choiceLabel = choice;
            }
            return (
              <li
                tabIndex={-1}
                key={value}
                className={`${i === selection ? 'active' : ''} ${liStyle.className}`}
                style={{
                  zIndex: 10 - i,
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

Dropdown.propTypes = {
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


Dropdown.defaultProps = {
  label: undefined,
};


export default Dropdown;


/* <div className="drop-container">
      <div
        tabIndex={0}
        role="button"
        onKeyPress={() => { setOpen(!open); }}
        onClick={() => { setOpen(!open); }}
        className={`bg-grey-lighter text-grey-darker border border-grey-lighter rounded drop${open ? ' visible opacity' : ''}`}
      >
        <div className="option active placeholder text-xs tracking-wide text-grey-darker font-bold" data-value="placeholder">
          {selection ? `${selection} passenger${selection > 1 ? 's' : ''}` : 'No of Passengers'}
        </div>
        {choices.map((choice) => {
          let { value, label } = choice;
          if (typeof choice === 'string') {
            value = choice;
            label = choice;
          }
          return (
            <div
              key={value}
              tabIndex={0}
              role="button"
              className={`option${selection === value ? 'active' : ''}`}
              onKeyPress={(e) => { select(e, value); }}
              onClick={(e) => { select(e, value); }}
            >{label}
            </div>
          );
        })}
      </div>
      <div className="drop-offset" />

    </div> */
