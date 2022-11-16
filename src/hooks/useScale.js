import { extent } from "d3-array";
import { scaleLinear, scaleOrdinal, scalePoint } from "d3-scale";
import { uniq } from "ramda";
import { useMemo } from "react";

import { expand } from "../utils";

const useScaleContinuous = ({ data, aes, size, limits = null, expandBy = 0.05 }) => {
  const scale = useMemo(() => {
    const range = aes === "y" ? [size, 0] : [0, size];
    return scaleLinear(
      expand({ range: limits || extent(data, (d) => d[aes]), expandBy }),
      range
    );
  }, [aes, data, expandBy, size, limits]);
  return scale;
};

const useScaleDiscrete = ({ data, aes, size, padding = 0.05 }) => {
  const scale = useMemo(() => {
    return scalePoint(
      uniq(data.map((d) => d[aes])),
      [0, size]
    ).padding(padding);
  }, [aes, data, size, padding]);
  return scale;
};

const useScaleColor = ({ data, aes, colors }) => {
  const domain = uniq(data.map((d) => d[aes]));
  return scaleOrdinal(domain, colors);
};


export { useScaleContinuous, useScaleColor, useScaleDiscrete };
