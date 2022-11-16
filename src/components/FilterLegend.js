import { useEffect, useState } from "react";
import { map, mapObjIndexed } from "ramda";
import { CheckboxLegendItem } from "./LegendItem";

import Legend from "./Legend";
import useLegendItems from "../hooks/useLegendItems";

const FilterLegend = ({ title, data, colors, handleOnChange }) => {
  const legendItems = useLegendItems(data, "color", colors);
  const [checkedState, setCheckedState] = useState(map(() => true, legendItems));

  // Reset state when new legendItems are created, i.e. after data changes
  useEffect(() => {
    setCheckedState(map(() => true, legendItems));
  }, [legendItems])

  const handleOnLegendItemChange = (key) => {
    const newState = { ...checkedState, [key]: !checkedState[key] }
    setCheckedState(newState);
    handleOnChange(newState);
  };

  return (
    <Legend title={title} horizontal={false} inline={false} alignItems="start">
      {Object.values(mapObjIndexed((value, key) => (
        <CheckboxLegendItem
          key={key}
          label={key}
          color={value}
          checked={checkedState[key]}
          handleOnChange={handleOnLegendItemChange}
        />
      ), legendItems))}
    </Legend>
  );
};

export default FilterLegend;
