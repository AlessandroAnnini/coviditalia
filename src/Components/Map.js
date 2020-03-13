import React from "react";
import * as d3 from "d3";
import { geoMercator, geoPath } from "d3-geo";
import _ from "lodash";

const customDomain = max => {
  const scale = [0, 0.1, 0.3, 0.57, 0.77, 0.83, 0.87, 0.9, 0.95, 0.98, 1];
  return scale.map(n => max * n);
};

// const prvMap = {
//   SX: "SS",
//   OT: "SS",
//   NR: "NU",
//   OG: "NU",
//   MD: "SU",
//   CI: "SU"
// };

const projection = geoMercator()
  .scale(4000)
  .center([13, 44.8]);

const Map = ({ regions, data, dateIdx, onMouseOver }) => {
  let max = 0;
  data.forEach(pd => {
    const currMax = _.maxBy(pd, "totale_casi").totale_casi;
    max = currMax > max ? currMax : max;
  });

  const colorScale = d3
    .scaleSequential(d3.interpolateReds)
    .domain(customDomain(max));
  // .domain([0, max]);

  return (
    <svg viewBox="0 0 900 1130" style={{ border: "1px solid black" }}>
      <g className="regions">
        {regions.map((d, i) => (
          <path
            key={`path-region-${i}`}
            d={geoPath().projection(projection)(d)}
            className="region"
            fill="#eee"
            stroke="#000"
            strokeWidth={0.5}
          />
        ))}
      </g>
      <g className="provinces">
        {data[dateIdx] &&
          data[dateIdx].map((d, i) => (
            <path
              key={`path-province-${i}`}
              d={geoPath().projection(projection)(d)}
              className="province"
              fill={colorScale && colorScale(d.totale_casi)}
              stroke="#aaa"
              strokeWidth={0.5}
              onMouseOver={() => onMouseOver(d)}
            />
          ))}
      </g>
    </svg>
  );
};

const areEqual = (prevProps, nextProps) => {
  return (
    prevProps.data === nextProps.data && prevProps.dateIdx === nextProps.dateIdx
  );
};

export default React.memo(Map, areEqual);
