import React from 'react';
import Button from 'carbon-components-react/lib/components/Button';
import Slider from 'carbon-components-react/lib/components/Slider';
import { Add16, Subtract16 } from '@carbon/icons-react';
import format from 'date-fns/format';

const DATE_FORMAT_ITA = 'dd/MM/yyyy';

const Controls = ({ onClick, days, value, currentDate, onSlide }) => {
  const currentDateFormatted = format(currentDate, DATE_FORMAT_ITA);

  return (
    <div className="controlsContainer">
      <div className="controlsFirstRow">
        <div className="dateText">{currentDateFormatted}</div>
      </div>
      <div className="controlsSecondRow">
        <Button
          renderIcon={Subtract16}
          kind="secondary"
          size="small"
          hasIconOnly
          iconDescription="add days"
          tooltipPosition="bottom"
          tooltipAlignment="start"
          onClick={() => onClick('sub')}
          style={{ marginRight: 16 }}
        />
        <Slider
          step={1}
          min={0}
          max={days}
          value={value}
          hideTextInput
          onChange={onSlide}
        />
        <Button
          renderIcon={Add16}
          kind="secondary"
          size="small"
          hasIconOnly
          iconDescription="add days"
          tooltipPosition="bottom"
          tooltipAlignment="start"
          onClick={() => onClick('add')}
        />
      </div>
    </div>
  );
};

const areEqual = (prevProps, nextProps) => {
  return prevProps.value === nextProps.value;
};

export default React.memo(Controls, areEqual);
