import { useState, useEffect } from "react";
import { csv as d3Csv } from "d3-fetch";
import _ from "lodash";

const getDataUrl = date =>
  `https://raw.githubusercontent.com/pcm-dpc/COVID-19/master/dati-province/dpc-covid19-ita-province-${date}.csv`;

export default (datesArray, provinces) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (datesArray && provinces) {
      const getData = async () => {
        const result = await Promise.all(
          datesArray.map(async dateString => {
            const url = getDataUrl(dateString);
            const data = await d3Csv(url);
            return data.map(d => ({ ...d, totale_casi: +d.totale_casi }));
          })
        );

        const nextData = result.map(pd =>
          _(pd)
            .keyBy("sigla_provincia")
            .merge(_.keyBy(provinces, "properties.HASC_2"))
            .values()
            .value()
        );

        setData(nextData);
      };

      getData();
    }
  }, [datesArray, provinces]);

  return data;
};
