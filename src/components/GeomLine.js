import Line from "./Line";
import { group } from "d3-array";

const makeKey = (datum) => datum.map(d => d.id).join("-");

const GeomLine = ({ data, scale, groupVariable = "group", colorVariable = "color" }) => {
  const lines = Array.from(group(data, d => d[groupVariable]).values());
  return (
    <g>
      {lines.map(datum => (
        <Line key={makeKey(datum)} datum={datum} scale={scale} color={scale.color(datum[0][colorVariable])}/>
      ))}
    </g>
  )
}

export default GeomLine;
