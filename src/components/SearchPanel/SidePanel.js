import React, { Fragment } from 'react';
import { Dropdown, Toggle } from '../Input';
import { passengers } from './data';

const SidePanel = ({
  setMonthSearch, monthSearch, setExportMode, expertMode,
}) => (
  <div style={{ position: 'relative' }}>
    <Dropdown label="Num of Passengers" choices={passengers} />
    <Toggle
      checked={!monthSearch}
      onChange={() => {
        setMonthSearch(false);
      }}
      label="Search exact dates"
      name="exact"
    />
    <Toggle
      checked={monthSearch}
      onChange={() => {
        setMonthSearch(true);
      }}
      label="See calendar of lowest fares"
      name="month"
    />
    <Toggle
      checked={expertMode}
      onChange={() => {
        setExportMode(!expertMode);
      }}
      label="Expert Mode"
      name="expert"
    />
  </div>
);

export default SidePanel;
