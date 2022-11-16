import { uniq } from "ramda";
import { useEffect, useState } from "react";

import Legend from "./Legend";
import { LegendItem } from "./LegendItem";

const StratificationLegend = ({ title, data, colors, ...legendProps}) => {
  const [legendItems, setLegendItems] = useState([]);
  useEffect(() => {
    const domain = uniq(data.map(({ color }) => color));
    const items = domain.map((d, i) => ({
      label: d,
      color: colors[i],
    }));
    setLegendItems(items);
  }, [colors, data]);
  return (
    <Legend
      className="legend-stratification right"
      title={title}
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
  );
};

export default StratificationLegend;
