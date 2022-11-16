import { statistics } from './utils';
import { formatTooltip, showTooltip, hideTooltip } from '../Plot/utils';
import { scaleDiscrete, scaleContinuous } from '../Plot/scales';
import Plot from '../Plot';
import { select } from 'd3';

class Boxplot extends Plot {
  calculateStats() {
    this.stats = statistics(this.data);
  }
  setScales() {
    const {
      scale: xScale,
      scaleCenter: xScaleCenter,
      scaleJitter: xScaleJitter,
      axis: xAxis
    } = scaleDiscrete({
      values: this.data.map((d) => d.x),
      size: this.panelWidth,
      position: 'bottom',
    })
    const { scale: yScale, axis: yAxis } = scaleContinuous({
      values: this.stats.flatMap((d) => [d.min, d.max]),
      size: this.panelHeight,
      position: 'left',
    })
    this.xScale = xScale;
    this.xScaleCenter = xScaleCenter;
    this.xScaleJitter = xScaleJitter;
    this.yScale = yScale;
    this.xAxis = xAxis;
    this.yAxis = yAxis;
  }
  renderGeoms() {
    this
     .addGeom({
       type: 'line',
       className: 'boxplot-vert-line',
       attributes: {
         x1: (d) => this.xScaleCenter(d.x),
         x2: (d) => this.xScaleCenter(d.x),
         y1: (d) => this.yScale(d.min),
         y2: (d) => this.yScale(d.max),
       },
       data: this.stats,
     })
     .addGeom({
        type: 'rect',
        className: 'boxplot-box',
        attributes: {
          x: (d) => this.xScale(d.x),
          y: (d) => this.yScale(d.q3),
          height: (d) => this.yScale(d.q1) - this.yScale(d.q3),
          width: this.xScale.bandwidth()
        },
        on: {
          mouseenter: ({ layerX, layerY }, { tooltip }) => showTooltip({
            selection: this.tooltip,
            content: formatTooltip(tooltip),
            x: layerX,
            y: layerY,
          }),
          mouseleave: () => hideTooltip(this.tooltip),
        },
        data: this.stats,
      })
      .addGeom({
        type: 'line',
        className: 'boxplot-median',
        attributes: {
          x1: (d) => this.xScale(d.x),
          x2: (d) => this.xScale(d.x) + this.xScale.bandwidth(),
          y1: (d) => this.yScale(d.median),
          y2: (d) => this.yScale(d.median),
        },
        data: this.stats,
      })
      .addGeom({
        type: 'circle',
        className: 'boxplot-dot',
        attributes: {
          cx: (d) => this.xScaleJitter(d.x, this.data, 'x'),
          cy: (d) => this.yScale(d.y),
          fill: (d) => d.color,
          r: 4,
        },
        on: {
          mouseenter: ({ target, layerX, layerY }, { tooltip }) => {
            select(target).attr('r', 6);
            showTooltip({
              selection: this.tooltip,
              content: formatTooltip(tooltip),
              x: layerX,
              y: layerY,
            });
          },
          mouseleave: ({ target }) => {
            select(target).attr('r', 4);
            hideTooltip(this.tooltip);
          },
        },
      });
  }
  render() {
    if (this.panelWidth > 0 && this.panelHeight > 0) {
      this.transformPanel();
      this.calculateStats();
      this.setScales();
      this.renderAxes();
      this.renderLabel();
      this.renderGeoms();
    }
  }
}

export default Boxplot;
