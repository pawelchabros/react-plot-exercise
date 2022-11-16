import { useLayoutEffect, useState, useRef } from "react";
import PropTypes from "prop-types";

const useSize = (dependencies = [], defaultSize = { width: 0, height: 0}) => {
  const ref = useRef(null);
  const [size, setSize] = useState(defaultSize);
  useLayoutEffect(() => {
    const { width, height } = ref.current.getBBox();
    setSize({ width, height });
  // eslint-disable-next-line
  }, [...dependencies, ref]);

  return [size, setSize, ref]
};

useSize.propTypes = {
  dependencies: PropTypes.array,
  defaultSize: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
  }),
};

export default useSize;
