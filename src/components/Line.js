import { line } from "d3-shape";

const Line = ({ datum, scale, color = "grey", size = 1 }) => {
  const lineGen = line()
    .x(({ x }) => scale.x(x))
    .y(({ y }) => scale.y(y));
  return (
    <path d={lineGen(datum)} stroke={color} strokeWidth={size} fill="none" />
  );
};

export default Line;
