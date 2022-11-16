const HorizontalLine = ({ y, scale }) => {
  const [xMin, xMax] = scale.x.domain();
  return (
    <line
      className="horizontal-line"
      x1={scale.x(xMin)}
      x2={scale.x(xMax + 0.5)}
      y1={scale.y(y)}
      y2={scale.y(y)}
    />
  )
}

export default HorizontalLine;
