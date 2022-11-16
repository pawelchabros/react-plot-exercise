import { area } from "d3-shape";
import { repeat } from "ramda";
import { useEffect, useState } from "react";

const AreaPath = ({ data, scale, fill, padding = 0.5 }) => {
  const [d, setD] = useState("");
  useEffect(() => {
    const areaGen = area()
      .y0(() => scale.y(0))
      .x(({ x }) => scale.x(x))
      .y1(({ y }) => scale.y(y));
    const dataPadded = repeat(data, 2)
      .flatMap((data, i) =>
        data.map(({ x, y }) => ({
          x: x + i * padding,
          y,
        }))
      )
      .sort((a, b) => a.x - b.x);
    setD(areaGen(dataPadded));
  }, [data, scale, padding]);
  return <path d={d} fill={scale.color(fill)} />;
};

export default AreaPath;
