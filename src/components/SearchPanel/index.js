import React, { useState } from 'react';
import SidePanel from './SidePanel';
import MainPanel from './MainPanel';

const Form = () => {
  const [monthSearch, setMonthSearch] = useState(false);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [dateRange, setDateRange] = useState(null);
  const [roundTrip, setRoundTrip] = useState(true);
  const [expertMode, setExportMode] = useState(false);

  const toggleRoundTrip = () => {
    setRoundTrip(!roundTrip);
    if (dateRange && dateRange.length > 1) {
      setDateRange(dateRange[0]);
    }
  };

  return (
    <form className="w-full max-w-3xl">
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ width: '70%' }}>
          <MainPanel
            setOrigin={setOrigin}
            expertMode={expertMode}
            toggleRoundTrip={toggleRoundTrip}
            setDestination={setDestination}
            roundTrip={roundTrip}
            monthSearch={monthSearch}
            setDateRange={setDateRange}
            dateRange={dateRange}
          />
        </div>
        <div style={{width: '25%' }}>
          <SidePanel
            setMonthSearch={setMonthSearch}
            monthSearch={monthSearch}
            setExportMode={setExportMode}
            expertMode={expertMode}
          />
        </div>
      </div>
      {origin && destination && dateRange && dateRange.length > 1 && (
        <button
          type="button"
          className="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded w-1/2"
        >Search
        </button>
      )}
    </form>
  );
};

export default Form;
