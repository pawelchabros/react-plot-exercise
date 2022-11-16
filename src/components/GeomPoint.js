const GeomPoint = ({ data, scale, size = 4 }) => {
  const points = data.map(({ x, y, color, id }) => (
    <circle
      className="point"
      key={id}
      cx={scale.x(x)}
      cy={scale.y(y)}
      fill={scale.color(color)}
      r={size / 2}
    />
  ));
  return <g>{points}</g>;
};

export default GeomPoint;
