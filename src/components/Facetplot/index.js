import { facetId, subplotSize } from './utils';
import { unique } from '../Plot/utils'
import { select } from 'd3';

class Facetplot {
  static instances = new Map();
  htmlElements = {};
  data;
  labels;
  width;
  height;
  margin;
  subplotWidth;
  subplotHeight;
  parentElement;
  facetDomain;
  constructor(id) {
    this.id = id;
    this.parentElement = document.getElementById(id);
    this.setupPlot();
    this.setResizeObserver();
  }
  static getInstance({ Subplot, data, id, labels, margin }) {
    if (!this.instances.has(id)) {
      this.instances.set(id, new this(id))
    }
    const instance = this.instances.get(id);
    instance.Subplot = Subplot;
    instance.data = data;
    instance.labels = labels;
    instance.margin = margin;
    return instance;
  }
  setMargin() {
    select(this.parentElement)
      .style('grid-template-columns', `${this.margin.left}px auto`)
      .style('grid-template-rows', `auto ${this.margin.bottom}px`);
  }
  setSize() {
    const { width, height } = this.parentElement.getBoundingClientRect();
    this.width = width - this.margin.left;
    this.height = height - this.margin.bottom;
  }
  setResizeObserver() {
    const resizeObserver = new ResizeObserver(() => {
      this.render();
    });
    resizeObserver.observe(this.parentElement);
  }
  setupPlot() {
    ['plot-area', 'plot-label-x', 'plot-label-y'].forEach((className) => {
      this.htmlElements[className] = select(this.parentElement)
        .append('div')
        .attr('class', className);
    });
  }
  setupFacets() {
    this.facetDomain = unique(this.data.map((d) => d.facet));
    const { subplotWidth, subplotHeight } = subplotSize({
      width: this.width,
      height: this.height,
      nFacets: this.facetDomain.length,
    })
    this.subplotWidth = subplotWidth;
    this.subplotHeight = subplotHeight;
    function setSubplotSize(selection) {
      if (subplotWidth > 0 && subplotHeight > 0) selection
        .attr('width', subplotWidth)
        .attr('height', subplotHeight);
    }
    this.htmlElements['plot-area']
      .selectAll('.subplot-svg')
      .data(this.facetDomain, (facet) => facetId(this.id, facet))
      .join(
        (enter) => {
          const subplotDiv = enter
            .append('div')
            .attr('class', 'subplot-div')
            .attr('id', (facet) => facetId(this.id, facet));
          subplotDiv.append('div').attr('class', 'subplot-tooltip');
          const subplotSvg = subplotDiv.append('svg')
            .attr('class', 'subplot-svg');
          setSubplotSize(subplotSvg);
        },
        (update) => {
          const subplotSvg = update.attr('display', 'inline');
          setSubplotSize(subplotSvg);
        },
        (exit) => {
          exit.attr('display', 'none')
        }
      )
    this.htmlElements['plot-label-x'].html(this.labels.x);
    this.htmlElements['plot-label-y'].html(this.labels.y);
  }
  render() {
    this.setMargin();
    this.setSize();
    this.setupFacets();
    this.facetDomain.forEach((facet) => {
      const facetData = this.data.filter((d) => d.facet === facet)
      const subplot = this.Subplot.getInstance({
        id: facetId(this.id, facet),
        data: facetData,
        label: facet,
        width: this.subplotWidth,
        height: this.subplotHeight,
        margin: {
          top: 20,
          right: 10,
          bottom: 70,
          left: 60,
        }
      });
      subplot.render();
    });
  }
}

export default Facetplot;
