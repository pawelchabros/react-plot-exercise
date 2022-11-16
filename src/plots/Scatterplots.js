import { useEffect, useState } from "react";
import DataValidationMessage from "../components/DataValidationMessage";
import Legend from "../components/Legend";
import Scatterplot from "../components/Scatterplot";
import StratificationLegend from "../components/StratificationLegend";
import TextTile from "../components/TextTile";
import { LegendItem } from "../components/LegendItem";
import useResizeObserver from "../hooks/useResizeObserver";
import { gridLayout, sanitizeId } from "../utils";
import { gridDiagonal, categorical } from "../gmColors";

const Scatterplots = ({
  data,
  legendTitle = "Group",
  size = { width: null, height: null },
  margin = { top: 20, right: 20, bottom: 50, left: 50 },
  gap = 10,
  noDataMessage = "select at least 2 genes/proteins",
}) => {
  const [plotSize, ref] = useResizeObserver({ ...size });
  const [tileSize, setTileSize] = useState({ width: 0, height: 0 });
  const { labels, gridStyle } = gridLayout({ data, gap });
  const legendItems = [
    { label: "Gene:", color: gridDiagonal.fill.gene },
    { label: "Protein:", color: gridDiagonal.fill.protein },
  ];
  useEffect(() => {
    const n = labels.length;
    const calcTileSize = (plotDim, gap, n) => (plotDim - gap * (n - 1)) / n - 1;
    setTileSize({
      width: calcTileSize(plotSize.width, gap, n),
      height: calcTileSize(plotSize.height, gap, n),
    });
  }, [gap, labels.length, plotSize.height, plotSize.width]);
  const labelTiles = labels.map(({ name, type }) => (
    <TextTile
      key={name}
      className="text-tile-label"
      color={gridDiagonal.color[type]}
      fill={gridDiagonal.fill[type]}
      gridArea={`diagonal-${name}`}
      size={tileSize}
    >
      {name}
    </TextTile>
  ));
  const correlationTiles = data.map(({ x, y, correlation }) => {
    const id = sanitizeId(`upper-${x.name}-${y.name}`);
    return (
      <TextTile
        key={id}
        className="text-tile-value"
        gridArea={id}
        size={tileSize}
      >
        {correlation.toFixed(2)}
      </TextTile>
    );
  });
  const scatterplots = data.map(({ x, y, points, line }) => {
    const id = sanitizeId(`lower-${x.name}-${y.name}`);
    const xLabels = y.name === labels.at(-1).name;
    const yLabels = x.name === labels.at(0).name;
    const margin = {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    };
    return (
      <Scatterplot
        key={id}
        gridArea={id}
        data={points}
        trend={line}
        colors={categorical}
        size={tileSize}
        margin={margin}
        xLabels={xLabels}
        yLabels={yLabels}
      />
    );
  });
  const legendHeight = 30;
  return (
    <div
      style={{
        lineHeight: 0,
        height: "100%",
      }}
    >
      <div
        style={{
          boxSizing: "border-box",
          height: `calc(100% - ${legendHeight}px`,
          lineHeight: 0,
          paddingBottom: margin.bottom,
          paddingLeft: margin.left,
          paddingRight: margin.right,
          paddingTop: margin.top,
        }}
      >
        <DataValidationMessage data={data} message={noDataMessage}>
          <div ref={ref} className="tiles-container" style={gridStyle}>
            {labelTiles}
            {correlationTiles}
            {scatterplots}
          </div>
        </DataValidationMessage>
      </div>
      <div className="scatterplots-legends" style={{ height: legendHeight }}>
        <StratificationLegend
          title={legendTitle}
          data={data.flatMap(({ points }) => points)}
          colors={categorical}
        />
        <Legend
          className="legend-gene-protein"
          labelFirst={true}
        >
          {legendItems.map(({ label, color }) => (
            <LegendItem
              key={label}
              label={label}
              color={color}
              labelFirst={true}
            />
          ))}
          </Legend>
      </div>
    </div>
  );
};

export default Scatterplots;
