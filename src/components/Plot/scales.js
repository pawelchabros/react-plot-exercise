import { expand, unique } from './utils';
import { axisBottom, axisLeft, axisTop, axisRight, extent, scaleBand, scaleLinear } from 'd3';

function axisPosition(position) {
  switch (position) {
    case "bottom": return axisBottom;
    case "left": return axisLeft;
    case "top": return axisTop;
    case "right": return axisRight;
  }
}
export function scaleDiscrete({ values, size, position }) {
  const domain = unique(values);
  const scale = scaleBand(domain, [0, size])
    .paddingInner(0.5)
    .paddingOuter(0.5);
  const scaleCenter = (d) => scale(d) + scale.bandwidth() / 2;
  const scaleJitter = (d, data, variable) => {
    const isSingle = data.filter((x) => x[variable] === d).length === 1;
    const position = scaleCenter(d);
    if (isSingle) return position;
    const jitter = (Math.random() - 0.5) * scale.bandwidth() * 0.5;
    return position + jitter;
  }
  const axis = axisPosition(position)(scale).tickSizeOuter(0);
  return { scale, scaleCenter, scaleJitter, axis };
}
export function scaleContinuous({ values, size, position, limits }) {
  limits = limits || [-Infinity, Infinity];
  const domain = expand(
    extent(values),
    0.05,
  );
  domain[0] = Math.max(domain[0], limits[0]);
  domain[1] = Math.min(domain[1], limits[1]);
  const scale = scaleLinear(domain, [size, 0]).nice();
  const nTicks = Math.max(2, Math.floor(size / 30));
  const axis = axisPosition(position)(scale)
    .ticks(nTicks)
    .tickSizeOuter(0);
  return { scale, axis };
}
