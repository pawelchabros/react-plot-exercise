import { useEffect, useState } from "react";
import { uniq } from "lodash";

/**
 * Get label to color mapping
 * @param {Object} data
 * @param {String} colorVariable
 * @param {Array} colors
 * @returns An object with keys being unique values of `groupVariable` in `data`
 * and entries being colors from `color` array
 */
const getLabelToColorMapping = (data, colorVariable = "color", colors) => {
  const domain = uniq(data.map(d => d[colorVariable]));
  const mapping = Object.fromEntries(domain.map((group, index) => [group, colors[index]]));
  return mapping;
}

/**
 * Use legend colors
 * @param {Object} data
 * @param {String} colorVariable
 * @param {Array} colors
 * @returns An object with data groups mapping to colors
 */
const useLegendItems = (data, colorVariable = "color", colors) => {
  const defaultState = getLabelToColorMapping(data, colorVariable, colors);
  const [items, setItems] = useState(defaultState);
  useEffect(() => {
    const updatedState = getLabelToColorMapping(data, colorVariable, colors);
    setItems(updatedState);
  }, [colors, colorVariable, data]);
  return items;
}

export default useLegendItems;
