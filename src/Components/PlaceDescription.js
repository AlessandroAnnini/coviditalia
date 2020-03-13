import React from 'react';

const PlaceDescription = props => {
  const { properties, totale_casi } = props;

  const text = properties
    ? `${properties.NAME_2} - ${properties.NAME_1}: ${totale_casi}`
    : '';

  return <div className="placeDescription">{text}</div>;
};

export default React.memo(PlaceDescription);
