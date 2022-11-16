import { brush, brushX, brushY } from "d3-brush";
import { select } from "d3-selection";
import { pick } from "ramda";
import { useEffect, useRef } from "react";

const brushGenerator = ({ dimensions = ["x", "y"] }) => {
  switch (dimensions.sort().join("-")) {
    case "x-y": return brush();
    case "x": return brushX();
    case "y": return brushY();
    default: throw new Error("invalid `dimensions` argument")
  }
}

const selectionDimension = ({ selection, dimension }) => {
  const range = selection.map((d) => {
    return Array.isArray(d)
      ? d[dimension === "x" ? 0 : 1]
      : d
  })
  return dimension === "y" ? range.reverse() : range;
}

const selectionToLimits = ({ dimensions, selection, scale }) => {
  return dimensions.reduce((limits, dimension) => {
    limits[dimension] = selectionDimension({ selection, dimension })
      .map((d) => scale[dimension].invert(d));
    return limits;
  }, {});
}

const useZoom = ({ dimensions = ["x", "y"], limits, scale, panelSize, onZoom }) => {
  const ref = useRef(null);
  useEffect(() => {
    select(ref.current).on("dblclick", () => {
      onZoom(pick(dimensions, limits))
    });
  }, [dimensions, limits, onZoom]);
  useEffect(() => {
    const zoomBrush = brushGenerator({ dimensions })
      .extent([[0, 0], [panelSize.width, panelSize.height]])
      .on("end", ({ selection, target }) => {
        if (selection) {
          const newLimits = selectionToLimits({ dimensions, selection, scale });
          onZoom(newLimits);
          target.move(brushElement, null);
        }
      });
    const brushElement = select(ref.current).call(zoomBrush);
  }, [dimensions, scale, panelSize.width, panelSize.height, onZoom]);
  return ref;
};

export default useZoom;
