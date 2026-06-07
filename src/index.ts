(function(){
  const TEXT_FOREIGN_OBJ = document.getElementById('node-shapes-text-foreign-object') as HTMLElement;
  const SHAPE = document.getElementById('node-shapes-text-shape');
  const TEXT = document.getElementById('node-shapes-text') as HTMLElement;

  function applyClamp() {
    const style = getComputedStyle(TEXT);
    // parse line-height: if numeric (e.g., "16.8px") use that; fallback to font-size * line-height multiplier
    let lineHeightPx = parseFloat(style.lineHeight);
    if (isNaN(lineHeightPx)) {
      const fontSizePx = parseFloat(style.fontSize);
      const lh = parseFloat(style.lineHeight) || 1.2;
      lineHeightPx = fontSizePx * lh;
    }
    // use foreignObject height (or rect height)
    const foreignObjHeight = parseFloat(TEXT_FOREIGN_OBJ.getAttribute('height') ?? '') || TEXT.clientHeight;
    const paddingTopBottom = 16; // matches padding in CSS (8px top + 8px bottom)
    const available = Math.max(0, foreignObjHeight - paddingTopBottom);
    const maxLines = Math.floor(available / lineHeightPx) || 1;
    TEXT.style.webkitLineClamp = String(maxLines);
    TEXT.style.maxHeight = (maxLines * lineHeightPx) + 'px';
  }

  // init + observe resize of svg/rect
  applyClamp();
  new ResizeObserver(applyClamp).observe(document.getElementById('svg') as HTMLElement);
})();