import { AxisBottom, AxisLeft } from "./Axis";
import Plot from "./Plot";

import GeomPoint from "./GeomPoint";
import Line from "./Line";
import { useScaleColor } from "../hooks/useScale";

const Scatterplot = ({
  data,
  trend = null,
  colors,
  size = { width: null, height: null },
  margin = { top: 10, right: 10, bottom: 40, left: 40 },
  gridArea = null,
  xLabels = true,
  yLabels = true,
}) => {
  const axisBottomClasses = ["axis-line", "axis-grid", xLabels ? "axis-labels": ""];
  const axisLeftClasses = ["axis-line", "axis-grid", yLabels ? "axis-labels": ""];
  const colorScale = useScaleColor({
    data,
    aes: "color",
    colors: colors,
  });
  if (size.width <= 0 || size.height <= 0) return <></>;
  return (
    <Plot
      data={data}
      size={size}
      margin={margin}
      colorScale={colorScale}
      style={{ gridArea }}
    >
      <AxisBottom aes="x" classNames={axisBottomClasses} />
      <AxisLeft aes="y" classNames={axisLeftClasses} />
      <GeomPoint data={data} />
      <Line datum={trend} color={"#62CDBB"} size="2" />
    </Plot>
  );
};

export default Scatterplot;
