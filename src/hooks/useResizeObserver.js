import { useLayoutEffect, useRef, useState } from "react";

const useResizeObserver = ({ width = null, height = null }) => {
  const ref = useRef(null);
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });
  useLayoutEffect(() => {
    if (!width || !height) {
      const resizeObserver = new ResizeObserver((element) => {
        const { width: elementWidth, height: elementHeight } =
          element[0].target.getBoundingClientRect();
        const newWidth = width || elementWidth;
        const newHeight = height || elementHeight;
        setSize({ width: newWidth, height: newHeight });
      });
      resizeObserver.observe(ref.current);
    } else {
      setSize({ width, height });
    }
  }, [height, width]);
  return [size, ref];
};

export default useResizeObserver;
