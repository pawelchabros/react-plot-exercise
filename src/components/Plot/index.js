import { select } from 'd3';
import { getId, setAttributes, setOn } from './utils';

export default class Plot {
  static instances = new Map();
  constructor(id) {
    const plotDiv = select(`#${id}`);
    this.plot = plotDiv.select('.subplot-svg');
    this.tooltip = plotDiv.select('.subplot-tooltip');
    this.panel = this.plot.append('g');
    this.xAxisG = this.panel.append('g').attr('class', 'x-axis');
    this.yAxisG = this.panel.append('g').attr('class', 'y-axis');
    this.labelG = this.plot.append('text').attr('class', 'plot-title');
  }
  static getInstance({ id, data, label, width, height, margin }) {
    if (!this.instances.has(id)) {
      this.instances.set(id, new this(id))
    }
    const instance = this.instances.get(id);
    instance.data = data;
    instance.label = label;
    instance.width = width;
    instance.height = height;
    instance.margin = margin;
    instance.panelWidth = width - margin.left - margin.right;
    instance.panelHeight = height - margin.top - margin.bottom;
    return instance;
  }
  transformPanel() {
    this.panel.attr('transform', `translate(
      ${this.margin.left}, ${this.margin.top}
    )`);
  }
  renderAxes() {
    this.xAxisG
      .attr('transform', `translate(0, ${this.panelHeight})`)
      .transition()
      .call(this.xAxis);
    this.yAxisG.transition().call(this.yAxis);
  }
  renderLabel() {
    this.labelG
      .attr('x', this.width / 2)
      .attr('y', this.margin.top)
      .text(this.label);
  }
  addGeom({ type, className, attributes, data, on }) {
    data = data || this.data;
    const setPosition = setAttributes(attributes);
    const setEvents = setOn(on);
    this.panel.selectAll(`.${className}`)
      .data(data, getId)
      .join(
        (enter) => setEvents(setPosition(
          enter.append(type).attr('class', className)
        )),
        (update) => setPosition(update.transition()),
        (exit) => exit.remove(),
      );
    return this;
  }
}
