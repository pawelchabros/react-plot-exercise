import { useEffect, useState } from 'react'
import Plot from "../components/Plot";
import GeomPoint from '../components/GeomPoint';
import GeomLine from '../components/GeomLine';
import LabelRelative from "../components/LabelRelative";
import FilterLegend from '../components/FilterLegend';
import { categorical } from '../gmColors'
import { AxisBottom, AxisLeft } from "../components/Axis";
import { useScaleColor } from '../hooks/useScale';
import { useScaleDiscrete } from '../hooks/useScale';
import PropTypes from "prop-types";

/**
 * Filter data
 * @param {Array} data An array with data points
 * @param {Object} selectedItems An object mapping labels to boolean selection state
 * @returns Subset of `data` containing labels which are selected
 */
const filterData = (data, selectedItems, colorVariable = "color") => {
  const selectedCategories = Object.keys(selectedItems).filter((key) => selectedItems[key]);
  return data.filter(d => selectedCategories.includes(d[colorVariable]));
}

filterData.propTypes = {
  data: PropTypes.array,
  selectedItems: PropTypes.objectOf(PropTypes.string),
  colorVariable: PropTypes.colorVariable,
}

const SpaghettiPlot = ({
  data,
  margin = { top: 60, right: 60, bottom: 70, left: 50 },
  legendWidth = 200,
  zoomOn = false,
  noDataMessage =  "no data available",
  namespace = null,
}) => {
  const { data: plotData, meta: { pValue, group } } = data;
  const [filteredData, setFilteredData] = useState(plotData);
  const colorScale = useScaleColor({
    data: plotData,
    aes: "color",
    colors: categorical,
  });

  // Update filtered data when new data is uploaded
  useEffect(() => {
    setFilteredData(plotData);
  }, [plotData])

  const handleFilterData = (selectedItems) => {
    const newFilteredData = filterData(plotData, selectedItems);
    setFilteredData(newFilteredData);
  }

  return (
    <div
      className="tiles-container"
      style={{
        lineHeight: 0,
        gridTemplateColumns: `calc(100% - ${legendWidth}px) ${legendWidth}px`,
        gridTemplateRows: "100%",
      }}
    >
      <Plot
        data={filteredData}
        margin={margin}
        useXScale={useScaleDiscrete}
        yScaleProps={{
          limits: null,
          expandBy: 0.05,
        }}
        colorScale={colorScale}
        zoomOn={zoomOn}
        zoomDimensions={["y"]}
        noDataMessage={noDataMessage}
        namespace={namespace}
      >
        <AxisLeft aes="y" title="Signature score" classNames={["axis-labels", "axis-line"]}/>
        <AxisBottom aes="x" classNames={["axis-labels", "axis-line", "axis-ticks"]}/>
        <GeomLine data={filteredData}/>
        <GeomPoint data={filteredData} />
        <LabelRelative
          xPercent={0.9}
          yPercent={-0.05}
          text={pValue}
          padding={10}
          textClass="label-text-dark"
          rectClass="label-background-dark"
        />
      </Plot>
      <div
        style={{
          display: "flex",
          marginTop: margin.top,
        }}
      >
        <FilterLegend
          title={<span className="bold">{group}</span>}
          data={plotData}
          colors={categorical}
          labelFirst={false}
          horizontal={false}
          inline={false}
          handleOnChange={handleFilterData}
        />
      </div>
    </div>
  )
}

export default SpaghettiPlot
