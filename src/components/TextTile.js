const TextTile = ({
  children,
  className,
  gridArea,
  color,
  fill,
  size = { width: null, height: null },
}) => {
  return (
    <div className={`text-tile ${className}`} style={{
      gridArea,
      color,
      backgroundColor: fill,
      ...size
    }}>
      {children}
    </div>
  );
};

export default TextTile;
