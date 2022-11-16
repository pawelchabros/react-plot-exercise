import { axisBottom, axisLeft, axisRight, axisTop } from "d3-axis";
import { select } from "d3-selection";
import { useEffect, useState } from "react";
import useSize from "../hooks/useSize";

const titleTransform = (position, panelSize, axisSize) => {
  const transform = {
    top: `translate(${panelSize.width / 2}, ${-axisSize.height})`,
    right: `translate(${axisSize.width}, ${panelSize.height / 2})`,
    bottom: `translate(${panelSize.width / 2}, ${axisSize.height})`,
    left: `translate(${-axisSize.width}, ${panelSize.height / 2})`,
  };
  return transform[position];
};

const AxisTitle = ({ title, position, panelSize, axisSize }) => {
  const [transform, setTransform] = useState(
    titleTransform(position, panelSize, axisSize)
  );

  useEffect(() => {
    setTransform(titleTransform(position, panelSize, axisSize));
  }, [title, panelSize, axisSize, position]);

  return (
    <g className="title" transform={transform}>
      <text textAnchor="middle">{title}</text>
    </g>
  );
};

const axisGen = ({ position }) => {
  const Axis = ({
    aes,
    scale,
    panelSize,
    title,
    classNames = ["axis-labels", "axis-line", "axis-ticks"],
  }) => {
    const meta = {
      top: {
        axis: axisTop,
        className: "axis-top",
        transform: null,
        axisSize: panelSize.width,
        gridLineSize: -panelSize.height,
      },
      right: {
        axis: axisRight,
        className: "axis-right",
        transform: `translate(${panelSize.width}, 0)`,
        axisSize: panelSize.height,
        gridLineSize: -panelSize.width,
      },
      bottom: {
        axis: axisBottom,
        className: "axis-bottom",
        transform: `translate(0, ${panelSize.height})`,
        axisSize: panelSize.width,
        gridLineSize: -panelSize.height,
      },
      left: {
        axis: axisLeft,
        className: "axis-left",
        transform: null,
        axisSize: panelSize.height,
        gridLineSize: -panelSize.width,
      },
    };
    const { axis, className, transform, axisSize, gridLineSize } =
      meta[position];
    const grid = classNames.includes("axis-grid");
    const ticks = classNames.includes("axis-ticks");
    const [size, setSize, ref] = useSize([
      aes,
      axis,
      axisSize,
      grid,
      gridLineSize,
      scale,
    ]);
    const tickSize = grid ? gridLineSize : ticks ? 5 : 0;
    useEffect(() => {
      // axis ticks can be used to create a grid, by setting their size to
      // negative plot height/width
      const nTicks = axisSize / 40;
      select(ref.current).call(
        axis(scale[aes]).tickSize(tickSize).ticks(nTicks).tickSizeOuter(0)
      );
      // Set size of axis after ticks are initialized
      if (ref.current) {
        setSize(ref.current.getBBox());
      }
    }, [ref, aes, axis, axisSize, tickSize, scale, setSize]);
    return (
      <g
        className={`axis ${className} ${classNames.join(" ")}`}
        transform={transform}
      >
        <g ref={ref} />
        <AxisTitle
          title={title}
          position={position}
          panelSize={panelSize}
          axisSize={size}
        />
      </g>
    );
  };
  Axis.noClip = true;
  return Axis;
};

const AxisTop = axisGen({ position: "top" });
const AxisRight = axisGen({ position: "right" });
const AxisBottom = axisGen({ position: "bottom" });
const AxisLeft = axisGen({ position: "left" });

export { AxisTop, AxisRight, AxisBottom, AxisLeft };
