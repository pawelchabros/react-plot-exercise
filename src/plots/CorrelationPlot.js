import GeomArea from "../components/GeomArea";
import GeomPointerLabel from "../components/GeomPointerLabel";
import HorizontalLine from "../components/HorizontalLine";
import Plot from "../components/Plot";
import { AxisLeft } from "../components/Axis";
import { positiveNegative } from "../gmColors";
import { useScaleColor } from "../hooks/useScale";

const CorrelationPlot = ({
  data,
  margin = { top: 80, right: 70, bottom: 80, left: 50 },
  panelMargin = { top: 60, right: 50, bottom: 60, left: 0 },
  zoomOn = false,
  noDataMessage =  "no data available",
  namespace = null,
}) => {
  const colorScale = useScaleColor({
    data,
    aes: "color",
    colors: positiveNegative,
  });
  return (
    <Plot
      data={data}
      margin={margin}
      panelMargin={panelMargin}
      yScaleProps={{
        limits: [-1, 1],
        expandBy: 0,
      }}
      xScaleProps={{
        limits: null,
        expandBy: 0,
      }}
      colorScale={colorScale}
      zoomOn={zoomOn}
      namespace={namespace}
      noDataMessage={noDataMessage}
    >
      <AxisLeft aes="y" classNames={["axis-labels", "axis-line"]} />
      <GeomArea />
      <HorizontalLine y={0} />
      <GeomPointerLabel />
    </Plot>
  );
};

export default CorrelationPlot;
