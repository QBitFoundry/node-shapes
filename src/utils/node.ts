class NodeFunctions {
  private canvas: SVGSVGElement;
  private elementId: string;
  private svg: HTMLElement;
  private TEXT_FOREIGN_OBJ: HTMLElement;
  private TEXT: HTMLElement;
  public paddingInline: number = 0;
  public paddingBlock: number = 0;

  constructor(canvas: SVGSVGElement, elementId: string, svg: HTMLElement, TEXT_FOREIGN_OBJ: HTMLElement, TEXT: HTMLElement) {
    this.canvas = canvas;
    this.elementId = elementId;
    this.svg = svg;
    this.TEXT_FOREIGN_OBJ = TEXT_FOREIGN_OBJ;
    this.TEXT = TEXT;
  }

  elipse(): void {
    const TEXT_FOREIGN_OBJ = this.TEXT_FOREIGN_OBJ as HTMLElement;
    const TEXT = this.TEXT as HTMLElement;

    function applyClamp() {
      const style = getComputedStyle(TEXT); // use html element
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
      console.log("maxLines", maxLines, available, lineHeightPx);
      TEXT.style.webkitLineClamp = String(maxLines);
      TEXT.style.maxHeight = (maxLines * lineHeightPx) + 'px';
    }

    // init + observe resize of svg/rect
    applyClamp();

    new ResizeObserver(applyClamp).observe(this.svg as HTMLElement);
  }

  draggable(id: string): void {
    const element = document.getElementById(id) as HTMLElement;
    let dragging: boolean = false;
    
    let offsetX: number = 0;
    let offsetY: number = 0;
    let elementWidth: number = 0;
    let elementHeight: number = 0;

    element.addEventListener("pointerdown", (event) => {
      dragging = true;

      element.setPointerCapture(event.pointerId);
      
      const rect = element.getBoundingClientRect();
      
      offsetX = event.clientX - rect.left;
      offsetY = event.clientY - rect.top;
      
      elementWidth = rect.width;
      elementHeight = rect.height;
      
      console.log('start', event.target);
    });
    
    element.addEventListener("pointermove", (event) => {
      if (!dragging) return;

      const parentRect: DOMRect = this.canvas.getBoundingClientRect();
      
      let x: number = event.offsetX - this.paddingInline - offsetX;
      let y: number = event.offsetY - this.paddingBlock - offsetY;
      console.log("x: ", x, "| y: ", y);

      x = Math.max(
        0,
        Math.min(x, parentRect.width - elementWidth - (this.paddingInline * 2)) //  padding times 2, because padding is applied on both sides (left and right)
      );

      y = Math.max(
        0,
        Math.min(y, parentRect.height - elementHeight - (this.paddingBlock * 2)) //  padding times 2, because padding is applied on both ends (top and bottom)
      );

      console.log("Limits", x, y);
      console.log("Size", elementWidth, elementHeight);

      console.log("Bounding", parentRect.left, parentRect.top);
      
      element.style.cursor = "grab";
      element.setAttribute("x", (x).toString());
      element.setAttribute("y", (y).toString());

      console.log('moving', event.clientX, event.clientY);
    });

    element.addEventListener("pointerup", (event) => {
      dragging = false;
      element.releasePointerCapture(event.pointerId);
      element.style.cursor = "default";

      console.log('end');
    });
  }
}
export { NodeFunctions };