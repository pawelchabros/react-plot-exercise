import { ascending, rollup, quantile } from 'd3';

export function statistics(data) {
  const stats = Array.from(rollup(
    data,
    (v) => {
      const x = v[0].x;
      const values = v.map(d => d.y).sort(ascending);
      const q1 = quantile(values, 0.25);
      const median = quantile(values, 0.5);
      const q3 = quantile(values, 0.75);
      const interQuantileRange = q3 - q1;
      const min = Math.max(q1 - 1.5 * interQuantileRange, Math.min(...values));
      const max = Math.min(q3 + 1.5 * interQuantileRange, Math.max(...values));
      const tooltip = `
        max: ${max}
        q3: ${q3}
        median: ${median}
        q1: ${q1}
        min: ${min}
      `;
      return { x, q1, median, q3, interQuantileRange, min, max, tooltip };
    },
    d => d.x
  )).map(d => d[1])
  return stats;
}
