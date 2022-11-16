import { groupBy } from "ramda";
import { useEffect, useState } from "react";

import AreaPath from "./AreaPath";

const GeomArea = ({ data, scale }) => {
  const [areaPaths, setAreaPaths] = useState([]);
  useEffect(() => {
    const areaPaths = Object.entries(groupBy(({ color }) => color, data)).map(
      ([key, values]) => (
        <AreaPath key={key} data={values} fill={key} scale={scale} />
      )
    );
    setAreaPaths(Object.values(areaPaths));
  }, [data, scale]);
  return <g>{areaPaths}</g>;
};

export default GeomArea;
