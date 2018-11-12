import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import { AutoComplete, DatePicker } from '../../Input';
import { airports } from '../data';
import LengthOfStay from './LengthOfStay';
import loop from '../../../assets/images/loop.svg';
import arrowRight from '../../../assets/images/arrow-right.svg';

const searchKeys = ['name', 'iata'];

const MainPanel = ({
  setOrigin,
  expertMode,
  toggleRoundTrip,
  setDestination,
  roundTrip,
  monthSearch,
  setDateRange,
  dateRange,
}) => {
  const datePickerRef = createRef();
  const renderSuggestion = suggestion => (
    <div>
      {suggestion.name} ({suggestion.iata})
    </div>
  );

  const selectDate = (datePick) => {
    console.log(dateRange);
    if (datePick.length > 1) {
      datePickerRef.current.close();
    }
    setDateRange(datePick);
  };

  let icon = loop;
  if (!roundTrip) {
    icon = arrowRight;
  }

  return (
        <div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-2/5 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                htmlFor="origin"
              >Origin
              </label>
              <AutoComplete
                limitResults={10}
                selectField={(d) => { setOrigin(d); }}
                searchKeys={searchKeys}
                className="text-center appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey"
                id="origin"
                placeholder="Airport Name or Code"
                choices={airports}
                renderSuggestion={renderSuggestion}
                suggestionKey="name"
              />
            </div>
            <div
              role="button"
              tabIndex={-1}
              className="w-full md:w-1/5 px-3 self-center no-outline cursor-pointer"
              onKeyDown={toggleRoundTrip}
              onClick={toggleRoundTrip}
            >
              <img alt="arrow" src={icon} style={{ transform: 'scale(4)' }} />
            </div>
            <div className="w-full md:w-2/5">
              <label
                className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                htmlFor="destination"
              >Destination
              </label>
              <AutoComplete
                limitResults={10}
                selectField={(d) => { setDestination(d); }}
                searchKeys={searchKeys}
                className="text-center appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-grey"
                id="origin"
                placeholder="Airport Name or Code"
                choices={airports}
                renderSuggestion={renderSuggestion}
                suggestionKey="name"
              />

            </div>
          </div>
          {expertMode && (
          <input
            style={{ display: 'inline-block' }}
            placeholder={`${roundTrip ? 'Outbound ' : ''}Routing Codes`}
            className={`text-center appearance-none block w-${roundTrip ? '1/3' : '2/3'} bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 mt-6 leading-tight focus:outline-none focus:bg-white focus:border-grey`}
          />
          )}
          {expertMode && roundTrip && (
          <input
            style={{ display: 'inline-block' }}
            placeholder="Return Routing Codes"
            className="text-center appearance-none block w-1/3 bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 ml-8 mt-6 leading-tight focus:outline-none focus:bg-white focus:border-grey"
          />
          )}
          {expertMode
          && (
          <input
            placeholder="Carrier Codes"
            className="text-center appearance-none block w-2/3 mx-auto bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mt-3 mb-8 leading-tight focus:outline-none focus:bg-white focus:border-grey"
          />
          )}
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-3/4 px-3" style={{ margin: '0 auto' }}>
              <label
                className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
                htmlFor="grid-password"
              >
            Travel Date{roundTrip && !monthSearch && 's'}
              </label>
              <DatePicker
                ref={datePickerRef}
                className={`text-center appearance-none block w-${roundTrip ? '4/5 mx-auto' : '4/5 mx-auto'} bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-grey`}
                data-enable-time
                value={dateRange}
                onChange={selectDate}
                placeholder={
              monthSearch
                ? 'or a month later...'
                : `Someday${roundTrip ? ' to Another Day' : ''}`
            }
                options={{
                  mode: roundTrip && !monthSearch ? 'range' : undefined,
                  minDate: 'today',
                  enableTime: false,
                  dateFormat: 'F j, Y',
                  position: ' center',
                  closeOnComplete: true,
                  rangePlaceholder: 'to Another Day',
                }}
              />
              {monthSearch && roundTrip && <LengthOfStay />}
            </div>
          </div>
        </div>
  );
};

MainPanel.propTypes = {
  dateRange: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
  setOrigin: PropTypes.func.isRequired,
  expertMode: PropTypes.bool.isRequired,
  toggleRoundTrip: PropTypes.func.isRequired,
  setDestination: PropTypes.func.isRequired,
  roundTrip: PropTypes.bool.isRequired,
  monthSearch: PropTypes.bool.isRequired,
  setDateRange: PropTypes.func.isRequired,
};

MainPanel.defaultProps = {
  dateRange: null,
};

export default MainPanel;
