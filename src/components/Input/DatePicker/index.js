
import React, { Component, createRef, Fragment } from 'react';
import PropTypes from 'prop-types';
import Flatpickr from 'flatpickr';
import './themes/material_green.css';
import './style.css';

const hooks = [
  'onChange',
  'onOpen',
  'onClose',
  'onMonthChange',
  'onYearChange',
  'onReady',
  'onValueUpdate',
  'onDayCreate',
];

const getFont = (element) => {
  const prop = ['font-style', 'font-variant', 'font-weight', 'font-size', 'font-family'];
  let font = '';
  for (const x in prop) { font += `${window.getComputedStyle(element, null).getPropertyValue(prop[x])} `; }

  return font;
};

class DateTimePicker extends Component {
  constructor(props) {
    super(props);
    this.nodeRef = createRef();
  }

  componentDidMount() {
    const options = {
      onClose: () => {
        if (this.node.blur) {
          this.node.blur();
        }
      },
      ...this.props.options,
    };

    // Add prop hooks to options
    hooks.forEach((hook) => {
      if (this.props[hook]) {
        options[hook] = this.props[hook];
      }
    });

    options.onChange = (selectedDates, dateStr, instance) => {
      const { onChange } = this.props;
      if (options.closeOnComplete) {
        const { config } = instance;
        if (config.mode === 'range' && selectedDates.length > 1) {
          this.close();
        } else if (config.mode !== 'range') {
          this.close();
        }
      }
      onChange(selectedDates, dateStr, instance);
    };

    this.flatpickr = new Flatpickr(this.node, options);

    if (Object.prototype.hasOwnProperty.call(this.props, 'value')) {
      this.flatpickr.setDate(this.props.value, false);
    }
  }

  componentWillReceiveProps(props) {
    const { options } = props;
    const prevOptions = this.props.options;

    // Add prop hooks to options
    hooks.forEach((hook) => {
      if (Object.prototype.hasOwnProperty.call(props, hook)) {
        options[hook] = props[hook];
      }
      // Add prev ones too so we can compare against them later
      if (Object.prototype.hasOwnProperty.call(this.props, hook)) {
        prevOptions[hook] = this.props[hook];
      }
    });

    const optionsKeys = Object.getOwnPropertyNames(options);

    for (let index = optionsKeys.length - 1; index >= 0; index--) {
      const key = optionsKeys[index];
      let value = options[key];

      if (value !== prevOptions[key]) {
        // Hook handlers must be set as an array
        if (hooks.indexOf(key) !== -1 && !Array.isArray(value)) {
          value = [value];
        }

        this.flatpickr.set(key, value);
      }
    }

    if (Object.prototype.hasOwnProperty.call(props, 'value') && props.value !== this.props.value) {
      this.flatpickr.setDate(props.value, false);
    }
  }


  componentWillUnmount() {
    this.flatpickr.destroy();
  }

  close = () => {
    this.flatpickr.close();
  }

  render() {
    const {
      options, defaultValue, value, children, ...props
    } = this.props;
    const { flatpickr, node } = this;

    // Don't pass hooks to dom node
    hooks.forEach((hook) => {
      delete props[hook];
    });
    let textIndent = 0;
    let left = 0;
    let top = 0;
    let display = 'none';
    if (flatpickr && flatpickr.config.mode === 'range' && flatpickr.selectedDates.length < 2 && flatpickr.input) {
      if (node && node.value) {
        const c = document.createElement('canvas');
        const ct = c.getContext('2d');
        const ctx = c.getContext('2d');
        ctx.font = getFont(this.node);
        ct.font = getFont(this.label);
        const { clientWidth, clientHeight } = this.container;
        const textWidth = ctx.measureText(this.node.value).width;
        const labelWidth = ct.measureText(this.node.value).width;
        display = 'inline-block';
        top = clientHeight / 4;
        textIndent = -1 * ((labelWidth / 2) + textWidth) / 2;
        left = (clientWidth / 2) + (textWidth / 2) + (textIndent  / 2); 
      }
    }


    return options.wrap
      ? (
        <div
          {...props}
          ref={(ref) => { this.node = ref; }}
        >
          { children }
        </div>
      )
      : (
        <div style={{ position: 'relative' }} ref={(ref) => { this.container = ref; }}>
          <input
            style={{ display: 'inline-block', textIndent }}
            {...props}
            defaultValue={defaultValue}
            ref={(ref) => { this.node = ref; }}
          />
          <label
            ref={(ref) => { this.label = ref; }}
            style={{
              left, display, position: 'absolute', color: '#B8C2CC', top,
            }}
          >&nbsp;{this.props.options.rangePlaceholder}
          </label>
        </div>
      );
  }
}

DateTimePicker.propTypes = {
  defaultValue: PropTypes.string,
  options: PropTypes.shape({
    mode: PropTypes.string,
    minDate: PropTypes.string,
    enableTime: PropTypes.bool,
    dateFormat: PropTypes.string,
    position: PropTypes.string,
  }),
  onChange: PropTypes.func,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  onMonthChange: PropTypes.func,
  onYearChange: PropTypes.func,
  onReady: PropTypes.func,
  onValueUpdate: PropTypes.func,
  onDayCreate: PropTypes.func,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.object,
    PropTypes.number,
  ]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

DateTimePicker.defaultProps = {
  options: {},
  defaultValue: undefined,
  onChange: undefined,
  onOpen: undefined,
  onClose: undefined,
  onMonthChange: undefined,
  onYearChange: undefined,
  onReady: undefined,
  onValueUpdate: undefined,
  onDayCreate: undefined,
  children: undefined,
  value: undefined,
};


export default DateTimePicker;
