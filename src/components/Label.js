import useSize from "../hooks/useSize";

const Label = ({
  x = 0,
  y = 0,
  text,
  padding = 3,
  rectClass = "label-background",
  textClass = "label-text",
  nudge = { x: 0, y: 0 },
}) => {
  const [size, , ref] = useSize([text]);
  return (
    <g transform={`translate(${x + nudge.x * size.width }, ${y + nudge.y * size.height })`}>
      <rect
        className={`${rectClass}`}
        y={-(size.height + padding) / 2}
        width={size.width + padding}
        height={size.height + padding}
      />
      <text className={`${textClass}`} x={padding / 2} ref={ref}>
        {text}
      </text>
    </g>
  );
};

export default Label;
