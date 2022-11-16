import Label from "./Label";

const GeomPointerLabel = ({
  data,
  scale,
  nudgeX = 0.25,
  pointerSize = 50,
  pointerMargin = 2,
  pointerOverlap = 8,
}) => {
  return (
    <g>
      {data.map(({ x, y, label, color, id }) => {
        const isNegative = color === "negative";
        return (
          <g
            key={id}
            transform={`translate(${scale.x(x + nudgeX)}, ${
              scale.y(y) + pointerSize * (isNegative ? 1 : -1)
            })`}
          >
            <Label text={label} />
            <text className="label-value" y={20}>
              {y.toFixed(2)}
            </text>
            <line
              className="label-pointer"
              x1={-pointerMargin}
              x2={-pointerMargin}
              y1={isNegative ? 25 : -9}
              y2={(pointerSize + pointerOverlap) * (isNegative ? -1 : 1)}
            />
          </g>
        );
      })}
    </g>
  );
};

export default GeomPointerLabel;
