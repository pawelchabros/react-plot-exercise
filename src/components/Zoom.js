import useZoom from "../hooks/useZoom";

const Zoom = ({
  dimensions = ["x", "y"],
  limits,
  scale,
  panelSize,
  panelMargin,
  onZoom,
  zoomOn,
  children,
}) => {
  const ref = useZoom({
    dimensions,
    limits,
    scale,
    panelSize,
    panelMargin,
    onZoom,
  });
  const clipPathId = `${Math.random(10).toString().replace(".", "")}-${Date.now()}`;
  return (
    <>
      <defs>
        <clipPath id={clipPathId}>
          <rect
            width={panelSize.width + panelMargin.left + panelMargin.right}
            height={panelSize.height + panelMargin.top + panelMargin.bottom}
            transform={`translate(${-panelMargin.left}, ${-panelMargin.top})`}
          />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipPathId})`}>{children}</g>
      {zoomOn && <g ref={ref} className="transition-unset"></g>}
    </>
  );
};

export default Zoom;
