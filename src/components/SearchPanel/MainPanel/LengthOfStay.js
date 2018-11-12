import React, { useState } from 'react';
import { Keypad } from '../../Input';

const LengthOfStay = () => {
  const [focusedField, setFocusedField] = useState(null);
  const [start, setStart] = useState(' ');
  const [end, setEnd] = useState(' ');
  let clickKeypad = false;

  const onClickKeypad = (e, number) => {
    if (focusedField === 1) {
      setStart(parseInt(`${start}${number}`, 10));
    }
    if (focusedField === 2) {
      setEnd(parseInt(`${end}${number}`, 10));
    }
  };

  const onMouseDownKeypad = (e) => {
    clickKeypad = true;
    setTimeout(() => {
      clickKeypad = false;
    }, 100);
  };

  const onInputBlur = (e) => {
    if (clickKeypad) {
      e.preventDefault();
      e.target.focus();
    } else {
      setFocusedField(null);
    }
  };

  return (
    <div className="w-full flex">
      <div className="block uppercase tracking-wide text-grey-darker text-xs font-bold self-center whitespace-no-wrap ml-4 mr-8">
        Length of Stay
      </div>
      {focusedField
      && (
      <div style={{
        position: 'absolute', zIndex: 1, paddingTop: '50px', paddingLeft: focusedField === 1 ? '73px' : '195px',
      }}
      >
        <div style={{
          backgroundColor: '#ccc', padding: '0.3rem', zIndex: 9999, height: '200px',
        }}
        >
          <Keypad onMouseDown={onMouseDownKeypad} onClick={onClickKeypad} />
        </div>
      </div>
      )}
      <input
        value={start}
        onFocus={() => { setFocusedField(1); }}
        onBlur={onInputBlur}
        style={{ zIndex: 10 }}
        readOnly
        className="text-center appearance-none w-1/5 bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-3 leading-tight focus:outline-none focus:bg-white focus:border-grey"
      />
      <div className="block uppercase tracking-wide text-grey-darker text-xs font-bold self-center whitespace-no-wrap mx-2">
        to
      </div>
      <input
        value={end}
        onFocus={() => { setFocusedField(2); }}
        onBlur={onInputBlur}
        style={{ zIndex: 10 }}
        readOnly
        className="text-center appearance-none w-1/5 bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-3 leading-tight focus:outline-none focus:bg-white focus:border-grey"
      />
      <div className="block uppercase tracking-wide text-grey-darker text-xs font-bold self-center whitespace-no-wrap ml-3">
        nights
      </div>
    </div>
  );
};

export default LengthOfStay;
