import { useState, useEffect } from "react";
import { json as d3Json } from "d3-fetch";
import { feature } from "topojson-client";

const regionsUrl = "./italy-regions.json";
const provincesUrl = "./italy-provinces.json";

export default initObj => {
  const [result, setResult] = useState(initObj);

  useEffect(() => {
    const getData = async () => {
      const _topoReg = await d3Json(regionsUrl).catch(console.error);
      const regions = feature(_topoReg, _topoReg.objects.ITA_adm1).features;

      const _topoProv = await d3Json(provincesUrl).catch(console.error);
      const provinces = feature(_topoProv, _topoProv.objects.ITA_adm2).features;

      setResult({ regions, provinces });
    };

    getData();
  }, []);

  return result;
};
