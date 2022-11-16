import { uniq } from "ramda";

const expand = ({ range, expandBy }) => {
  const size = Math.abs(range[0] - range[1]);
  return range.map(
    (d, i) => d + (i === 0 ? size * -expandBy : size * expandBy)
  );
};

const flexDirection = (row) => {
  return {
    display: "flex",
    flexDirection: row ? "row" : "column",
  };
};

const sanitizeId = (str) => str.replaceAll(/\(|\)|\s+/g, "");

const gridLayout = ({ data, gap }) => {
  const labels = uniq(data.flatMap(({ x, y }) => [x, y]));
  const areas = labels
    .map(({ name: l1 }, i1) => {
      const row = labels.map(({ name: l2 }, i2) => {
        if (l1 === l2) return `diagonal-${l1}`;
        else if (i1 > i2) return `lower-${l2}-${l1}`;
        else return `upper-${l1}-${l2}`;
      }).map(sanitizeId);
      return `'${row.join(" ")}'`;
    })
    .join("\n");
  const gridStyle = {
    gridGap: gap,
    gridTemplateColumns: `repeat(${labels.length}, 1fr)`,
    gridTemplateRows: `repeat(${labels.length}, 1fr)`,
    gridTemplateAreas: areas,
  };
  return { labels, gridStyle };
};

export { expand, flexDirection, gridLayout, sanitizeId };
