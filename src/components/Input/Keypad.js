import React from 'react';

const Keypad = ({ onClick, onMouseDown }) => (
  <div className="keypad-container">
    <ul id="keyboard">
      <li
        tabIndex={0}
        role="button"
        className="letter"
        onMouseDown={onMouseDown}
        onClick={(e) => { onClick(e, 1); }}
        onKeyPress={(e) => { onClick(e, 1); }}
      >1
      </li>
      <li
        tabIndex={0}
        role="button"
        className="letter"
        onMouseDown={onMouseDown}
        onClick={(e) => { onClick(e, 2); }}
        onKeyPress={(e) => { onClick(e, 2); }}
      >2
      </li>
      <li
        tabIndex={0}
        role="button"
        className="letter last"
        onMouseDown={onMouseDown}
        onClick={(e) => { onClick(e, 3); }}
        onKeyPress={(e) => { onClick(e,3); }}
      >3
      </li>
      <li
        tabIndex={0}
        role="button"
        className="letter clearl"
        onMouseDown={onMouseDown}
        onClick={(e) => { onClick(e, 4); }}
        onKeyPress={(e) => { onClick(e, 4); }}
      >4
      </li>
      <li
        tabIndex={0}
        role="button"
        className="letter"
        onMouseDown={onMouseDown}
        onClick={(e) => { onClick(e, 5); }}
        onKeyPress={(e) => { onClick(e, 5); }}
      >5
      </li>
      <li
        tabIndex={0}
        role="button"
        className="letter last"
        onMouseDown={onMouseDown}
        onClick={(e) => { onClick(e, 6); }}
        onKeyPress={(e) => { onClick(e, 6); }}
      >6
      </li>
      <li
        tabIndex={0}
        role="button"
        className="letter bottom clearl"
        onMouseDown={onMouseDown}
        onClick={(e) => { onClick(e, 7); }}
        onKeyPress={(e) => { onClick(e, 7); }}
      >7
      </li>
      <li
        tabIndex={0}
        role="button"
        className="letter bottom"
        onMouseDown={onMouseDown}
        onClick={(e) => { onClick(e, 8); }}
        onKeyPress={(e) => { onClick(e, 8); }}
      >8
      </li>
      <li
        tabIndex={0}
        role="button"
        className="letter last bottom"
        onMouseDown={onMouseDown}
        onClick={(e) => { onClick(e, 9); }}
        onKeyPress={(e) => { onClick(e, 9); }}
      >9
      </li>
    </ul>
  </div>
);

export default Keypad;
