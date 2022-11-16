import { formatTooltip, showTooltip, hideTooltip } from '../Plot/utils';
import { scaleDiscrete, scaleContinuous } from '../Plot/scales';
import Plot from '../Plot';

class Barplot extends Plot {
  setScales() {
    const {
      scale: xScale,
      axis: xAxis
    } = scaleDiscrete({
      values: this.data.map((d) => d.x),
      size: this.panelWidth,
      position: 'bottom',
    })
    const { scale: yScale, axis: yAxis } = scaleContinuous({
      values: [0, ...this.data.map((d) => d.y)],
      size: this.panelHeight,
      position: 'left',
      limits: [0, Infinity],
    })
    this.xScale = xScale;
    this.yScale = yScale;
    this.xAxis = xAxis;
    this.yAxis = yAxis;
  }
  renderGeoms() {
    this
     .addGeom({
        type: 'rect',
        className: 'barplot-bar',
        attributes: {
          x: (d) => this.xScale(d.x),
          y: (d) => this.yScale(d.y),
          height: (d) => this.panelHeight - this.yScale(d.y),
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
        }
      });
  }
  render() {
    if (this.panelWidth > 0 && this.panelHeight > 0) {
      this.transformPanel();
      this.setScales();
      this.renderAxes();
      this.renderLabel();
      this.renderGeoms();
    }
  }
}

export default Barplot;
