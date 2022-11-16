export function unique(values) {
  return [...new Set(values)];
}
export function expand(domain, mult) {
  const range = domain[1] - domain[0];
  return [
    domain[0] - range * mult,
    domain[1] + range * mult,
  ]
}
export function getId(d) {
  return Object.values(d).join('-');
}
function setGen(type, args) {
  return (selection) => {
    if (args) {
      Object.keys(args).forEach((argName) => {
        const value = args[argName];
        if (value) selection[type](argName, value);
      });
    }
    return selection;
  } 
}
export function setAttributes(attributes) {
  return setGen('attr', attributes);
};
export function setOn(events) {
  return setGen('on', events);
}
export function formatTooltip(text) {
  return text
    .split('\n')
    .map((line) => `<span>${line}</span>`)
    .join('');
}
export function showTooltip({ selection, content, x, y }) {
  selection.html(content)
    .style('top', `${y + 10}px`)
    .style('left', `${x}px`)
    .style('opacity', 1);
}
export function hideTooltip(selection) {
  selection.style('opacity', 0);
}
