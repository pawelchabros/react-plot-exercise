import { useEffect, useState } from "react";

const useMargin = ({ margin, size }) => {
  const [innerSize, setInnerSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    setInnerSize({
      width: size.width - margin.left - margin.right,
      height: size.height - margin.top - margin.bottom,
    });
  }, [
    size.width,
    size.height,
    margin.top,
    margin.right,
    margin.bottom,
    margin.left,
  ]);
  return innerSize;
};

export default useMargin;
