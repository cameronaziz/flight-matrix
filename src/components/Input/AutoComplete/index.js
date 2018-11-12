import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Fuse from 'fuse.js';
import Autosuggest from './AutoSuggest';
import './autoComplete.css';

const AutoComplete = ({
  className, placeholder, selectField, choices, searchKeys, renderSuggestion, suggestionKey, limitResults,
}) => {
  const [formValue, setFormValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const getSuggestions = (value) => {
    const options = {
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 2,
      keys: searchKeys,
    };
    const fuse = new Fuse(choices, options); // "list" is the item array
    const result = fuse.search(value);
    if (limitResults) {
      return result.slice(0, limitResults);
    }
    return result;
  };

  const getSuggestionValue = suggestion => suggestion[suggestionKey];

  const renderSuggestionsContainer = ({ containerProps, children }) => (
    <div
      {... containerProps}
      className="autosuggest-container"
    >
      {children}
    </div>
  );

  const onChange = (event, { newValue }) => {
    setFormValue(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    const data = getSuggestions(value);
    setSuggestions(data);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionSelected = (evemt, data) => {
    if (selectField) {
      selectField(data);
    }
  };

  const inputProps = {
    placeholder,
    className,
    value: formValue,
    onChange,
  };

  return (
    <Autosuggest
      className={className}
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      onSuggestionSelected={onSuggestionSelected}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      renderSuggestionsContainer={renderSuggestionsContainer}
      inputProps={inputProps}
    />
  );
};

AutoComplete.propTypes = {
  selectField: PropTypes.func,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  choices: PropTypes.arrayOf(PropTypes.shape({

  })).isRequired,
  searchKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  renderSuggestion: PropTypes.func.isRequired,
  suggestionKey: PropTypes.string.isRequired,
};

AutoComplete.defaultProps = {
  selectField: undefined,
  placeholder: undefined,
  className: undefined,
};

export default AutoComplete;
