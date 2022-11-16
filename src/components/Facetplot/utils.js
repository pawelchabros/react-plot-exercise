export function facetId(plotId, facetName) {
  const nameValid = facetName
    .replaceAll('/', '_')
    .replaceAll('\.', '_');
  return `${plotId}-facet-${nameValid}`;
}
export function subplotSize({ width, height, nFacets }) {
  const nCol = nFacets > 3 ? Math.ceil(Math.sqrt(nFacets)) : nFacets;
  const nRow = Math.ceil(nFacets / nCol);
  // without this margin last subplot in a row jumps below
  const subplotMargin = 3;
  const subplotWidth = Math.floor(width / nCol) - subplotMargin;
  const subplotHeight = Math.floor(height / nRow);
  return { subplotWidth, subplotHeight };
}
