// import types
import type {Shape} from "../types/shape.js"

class Shapes {
  private static svgCache: Record<string, string> = {};
  private _defaultShapes: Shape = {
    "rectangle": {
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

  get defaultShapes() {
    return this._defaultShapes;
  }
  set defaultShapes(data) {
    // 
  }

  public async getShapeSVG(name: string): Promise<string> {
    const svgPath = `/default-shapes/${name}.svg`;
    if (Shapes.svgCache[svgPath]) {
      return Shapes.svgCache[svgPath];
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
}

export default Shapes;
