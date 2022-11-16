import PropTypes from "prop-types";

const LegendItem = ({ label, color, size = 8, labelFirst = false }) => {
  const order = labelFirst ? 0 : 1;
  return (
    <div
      className="legend-item bold"
      style={{ display: "flex", alignItems: "center" }}
    >
      <span className="legend-item-label" style={{ order }}>
        {label}
      </span>
      <div
        className="legend-item-mark"
        style={{ width: size, height: size, backgroundColor: color }}
      ></div>
    </div>
  );
};

const CheckboxLegendItem = ({ label, color, checked, handleOnChange }) => {
  return (
    <li
      className="legend-item"
      style={{ display: "flex", alignItems: "center" }}
    >
      <div
        className="legend-item-clickable"
        onClick={() => handleOnChange(label)}
      >
        <div
          className={`inside ${checked ? "checked" : ""}`}
          style={{
            backgroundColor: color,
          }}
        />
      </div>
      <label className="legend-item-label regular">{label}</label>
    </li>
  );
};

CheckboxLegendItem.propTypes = {
  label: PropTypes.string,
  color: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
};

export { LegendItem, CheckboxLegendItem };
