import { flexDirection } from "../utils";
import PropTypes from "prop-types";

const Legend = ({
  className,
  title = null,
  inline = true,
  horizontal = true,
  children,
  alignItems = "center",
}) => {
  return (
    <div
      className={`legend ${className}`}
      style={{ ...flexDirection(inline), alignItems }}
    >
      {title && <p className={`legend-title${horizontal ? "" : "-vertical"}`}>{title}</p>}
      <div className="legend-items" style={{ ...flexDirection(horizontal) }}>
        {children}
      </div>
    </div>
  );
};

Legend.propTypes = {
  items: PropTypes.object,
  className: PropTypes.string,
  title: PropTypes.any,
};

export default Legend;
