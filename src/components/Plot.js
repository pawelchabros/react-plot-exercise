import { Children, cloneElement, useState } from "react";
import { groupBy } from "ramda";
import DataValidationMessage from "./DataValidationMessage";
import Zoom from "./Zoom";
import { useScaleContinuous, useScaleColor } from "../hooks/useScale";
import useMargin from "../hooks/useMargin";
import useButton from "../hooks/useButton";
import useResizeObserver from "../hooks/useResizeObserver";
import { categorical } from "../gmColors";

/**
 * Plot
 * @param {Array} data An array with data points
 * @param {Object} size An object with width and height of the plot
 * @param {Object} margin An object with size of each margin (top, right, bottom, left)
 * @param {Object} panelMargin An object with size of panel (plotting area) margin
 * Elements outside panel are truncated
 * @param {function} useXScale Hook that is used to create x-axis scale
 * @param {Object} xScaleProps Properties used when creating x-scale
 * @param {function} useYScale Hook that is used to create y-axis scale
 * @param {Object} yScaleProps Properties used when creating y-scale
 * @param {function} colorScale Functions that takes categorical value and returns color
 * @param {boolean} zoomOn Flag that decides if zoom brushed area functionality is active
 * @param {Array} zoomDimensions Indicates in which dimensions should zoom work
 * Must be subset of ["x", "y"]
 * @param {string} namespace Id's prefix used in the plot
 * @param {string} noDataMessage Text to display when there's no data for given plot
 * @param {Array} children Array with children of the component (JSX elements)
 * @param {Object} style Object with CSS styles passed to outer `<div>`
 */
const Plot = ({
  data,
  size = { width: null, height: null },
  margin = { top: 20, right: 20, bottom: 50, left: 50 },
  panelMargin = { top: 0, right: 0, bottom: 0, left: 0 },
  useXScale = useScaleContinuous,
  xScaleProps = {
    limits: null,
    expandBy: 0.05,
  },
  useYScale = useScaleContinuous,
  yScaleProps = {
    limits: null,
    expandBy: 0.05,
  },
  colorScale,
  zoomOn = false,
  zoomDimensions = ["x", "y"],
  namespace,
  noDataMessage = "no data available",
  children,
  style,
}) => {
  const [plotSize, ref] = useResizeObserver({ ...size });
  const panelSize = useMargin({ margin, size: plotSize });
  useButton({
    onClick: () =>
      setLimits({
        x: xScaleProps.limits,
        y: yScaleProps.limits,
      }),
    id: `${namespace}-reset`,
  });
  const [limits, setLimits] = useState({
    x: xScaleProps.limits,
    y: yScaleProps.limits,
  });
  const xScale = useXScale({
    data,
    aes: "x",
    size: panelSize.width,
    ...xScaleProps,
    limits: limits.x,
  });
  const yScale = useYScale({
    data,
    aes: "y",
    size: panelSize.height,
    ...yScaleProps,
    limits: limits.y,
  });
  const defaultColorScale = useScaleColor({
    data: data,
    aes: "color",
    colors: categorical,
  });
  const childrenWithProps = groupBy(
    ({ type }) => (type.noClip ? "noClip" : "clip"),
    Children.map(children, (child) => {
      if (child) {
        return cloneElement(child, {
          data,
          scale: {
            x: xScale,
            y: yScale,
            color: colorScale || defaultColorScale,
          },
          panelSize,
        });
      }
    })
  );
  return (
    <div ref={ref} style={{ height: "100%", lineHeight: 0, ...style }}>
      <DataValidationMessage data={data} message={noDataMessage}>
        <svg {...plotSize} overflow="visible">
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            {childrenWithProps.noClip}
            <Zoom
              limits={{
                x: xScaleProps.limits,
                y: yScaleProps.limits,
              }}
              scale={{
                x: xScale,
                y: yScale,
              }}
              panelSize={panelSize}
              panelMargin={panelMargin}
              onZoom={setLimits}
              zoomOn={zoomOn}
              dimensions={zoomDimensions}
            >
              {childrenWithProps.clip}
            </Zoom>
          </g>
        </svg>
      </DataValidationMessage>
    </div>
  );
};

export default Plot;
