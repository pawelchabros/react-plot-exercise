import Plot from "../components/Plot";
import GeomLine from "../components/GeomLine";
import GeomPoint from "../components/GeomPoint";
import { AxisBottom, AxisLeft } from "../components/Axis";

const axisClasses = ["axis-labels", "axis-grid"];

const LinePlot = ({ data }) => {
  return (
    <Plot data={data}>
      <GeomLine />
      <GeomPoint />
      <AxisBottom aes="x" classNames={axisClasses} />
      <AxisLeft aes="y" classNames={axisClasses} />
    </Plot>
  );
};

export default LinePlot;
