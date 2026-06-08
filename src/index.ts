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


// Types Imports
import type {Shape} from './types/shape.ts';

// Types
type QueryOptions = {
  table: string;
  [key: string]: any;
};
type CanvasSize = {
  width: number;
  height: number;
  widthUnit: string;
  heightUnit: string;
}
type ShapeData = {
  [key: string]: any;
}

class Canvas {
  private canvas: HTMLDivElement;
  private static svgCache: Record<string, string> = {};
  public shapes: Shape = {
    "rect": {
      id: crypto.randomUUID(),
      size: {
        width: 100,
        height: 40,
      },
      radius: {
        size: 0,
        unit: 'px',
      },
      border: {
        size: 0,
        color: "rgba(0,0,0,1)",
        style: "solid",
      },
      text: {
        value: '',
        visible: true,
        color: 'rgba(0,0,0,1)',
        position: {
          vertical: 'center',
          horizontal: 'center'
        },
      },
      title: '',
      cursor: 'default',
      background: 'rgba(220,220,220,1)',
    },
  };

  
  constructor(canvas: HTMLDivElement, size: CanvasSize = {width: 100, height: 100, widthUnit: '%', heightUnit: 'px'}) {
    this.canvas = canvas;
    this.canvas.style.width = size.width.toString() + size.widthUnit;
    this.canvas.style.height = size.height.toString() + size.heightUnit;
  }
  
  // private createShape()
  private async getShapeSVG(name: string): Promise<string> {
    const svgPath = `/default-shapes/${name}.svg`;
    if (Canvas.svgCache[svgPath]) {
      return Canvas.svgCache[svgPath];
    }
    
    const response = await fetch('default-shapes/rect.svg', {cache: 'force-cache'});

    if(!response.ok) {
      throw new Error(
        `Failed to fetch SVG. Ensure you ran 'npx your-svg-init' ` +
        `to copy assets to their local public folder. Status: ${response.status}`
      );
    }

    const svg: string = await response.text();

    return svg;
  }
  private async createShape(name: string, data: ShapeData = {}): Promise<void> {
    // create shapes
    console.log(this.shapes[name]);
    // console.log(await this.getShapeSVG(name));
    const svg = await this.getShapeSVG(name) as string;
    const parser = new DOMParser();
    const xml = parser.parseFromString(svg, "image/svg+xml");

    const gElement = xml.querySelector('g');
    if(!gElement) throw new Error(`Target <g> tag not found.`);

    const foreignObject = xml.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
    foreignObject.setAttribute("width", "200");
    foreignObject.setAttribute("height", "40");
    foreignObject.innerHTML = `<div xmlns="http://www.w3.org/1999/xhtml" style="height:100%;box-sizing:border-box;padding:8px;display:flex;align-items:center;justify-content:center;">
        <p id="node-shapes-text" style="
            width:100%;
            line-height:1.2em;
            font-size:16px;
            display:-webkit-box;
            -webkit-box-orient:vertical;
            overflow:hidden;
            text-overflow:ellipsis;
            word-break:break-word;
            text-align:center;
            color: rgba(0,0,0,1);
        ">
        Very long text that should wrap into multiple lines inside the rectangle. If it overflows vertically, it must be truncated with an ellipsis after the last visible line.
        </p>
    </div>`;
    
    gElement.appendChild(foreignObject);

    const serializer = new XMLSerializer();
    const createdSVG = serializer.serializeToString(xml);

    // console.log(createdSVG);

    this.canvas.insertAdjacentHTML("beforeend", createdSVG);
    
  }

  insertShape(name: string): void {
    switch (name){
      case "rect":
        // Inserts the rectangle
        this.createShape(name);
    }
  }
}

export default Canvas;