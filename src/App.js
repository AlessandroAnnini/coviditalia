import React, { useState } from 'react';
import addDays from 'date-fns/addDays';
import subDays from 'date-fns/subDays';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import isBefore from 'date-fns/isBefore';
import isAfter from 'date-fns/isAfter';
import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';
import differenceInDays from 'date-fns/differenceInDays';

import Header from './Components/Header';
import Controls from './Components/Controls';
import PlaceDescription from './Components/PlaceDescription';
import Map from './Components/Map';

import useGeoData from './Hooks/useGeoData';
import useDataSource from './Hooks/useDataSource';

const now = new Date();
const today1830 = setMinutes(setHours(now, 18), 30);
const startDate = new Date(2020, 1, 24);
const endDate = isAfter(now, today1830) ? now : subDays(now, 1);
const days = differenceInDays(endDate, startDate);
const DATE_FORMAT = 'yyyyMMdd';

const generateDates = (curr, res = []) => {
  if (isBefore(curr, endDate)) {
    const formatted = format(curr, DATE_FORMAT);
    const next = addDays(curr, 1);
    return generateDates(next, [...res, formatted]);
  }
  return res;
};

const datesArray = generateDates(startDate);

export default () => {
  const [dateIdx, setDateIdx] = useState(days);
  const [sliderValue, setSliderValue] = useState(days);
  const [currentPlace, setCurrentPlace] = useState();

  const geoData = useGeoData({ regions: [], provinces: [] });
  const data = useDataSource(datesArray, geoData.provinces);

  const modDays = op => {
    const nextIdx = op === 'add' ? dateIdx + 1 : dateIdx - 1;
    if (nextIdx >= 0 && nextIdx <= days) {
      setDateIdx(nextIdx);
      setSliderValue(nextIdx);
    }
  };

  const onSlide = ({ value }) => {
    setDateIdx(value);
    setSliderValue(value);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <Header />
      <Controls
        onClick={modDays}
        days={days}
        value={sliderValue}
        currentDate={parseISO(datesArray[dateIdx], DATE_FORMAT, startDate)}
        onSlide={onSlide}
        startDate={startDate}
        endDate={endDate}
      />
      <PlaceDescription {...currentPlace} />
      <Map
        regions={geoData.regions}
        data={data}
        dateIdx={dateIdx}
        onMouseOver={setCurrentPlace}
      />
    </div>
  );
};

// https://github.com/deldersveld/topojson
// https://github.com/pcm-dpc/COVID-19
// https://blog.soshace.com/advanced-mapmaking-using-d3-d3-scale-and-d3-zoom-with-changing-data-to-create-sophisticated-maps/
