
/* TODO: 
    = Create a function inside canvas to hide overflow and make it default.
    - create text overflow handler func for node.
    - Create hash map / set for the nodes.
    - Create a function to resize and fit.
    - Put Node class as default export in seprate file / dir.
*/

// ============================

// import utils
import Shapes from './utils/shapes.js';

// import modules
import Node from './modules/node.js';

/**
 * NodeShapes provides the ability to create nodes, edges (connection between nodes object)
 *  and display them in visual representation.
 * @example
 * const nodeShapes = new NodeShapes("node-shapes-target-canvas-element-id");
 * @constructor Set's the canvas in instance. If id of element was given it finds the element.
 * @throws If element id is not found or the given value is not a valid HTML element or id.
 */
class NodeShapes {
  // private _canvas: HTMLElement;
  private _canvas: SVGSVGElement;
  /** Set's default draggable property. @default false */
  public draggable: boolean = false;
  /** Enables Context menu for nodes. @default true */
  public contextMenu: boolean = true;
  /** Takes a number for padding inline and block in pixels. Number could be in single decimal.
   * @example canvasPadding = {inline: 20, block: 20} //or
   * canvasPadding = {inline: 19.8, block: 17.67}
   */
  private _canvasPadding: {inline: number, block: number} | null = null;
  /** Default padding for nodes. @default "16px" */
  public defaultNodePadding: string = "16px";
  /** Default font family for nodes. @default null // uses the default font set's on your html body or parent. */
  public defaultNodeFontFamily: string | null = null;
  /** Default font size for nodes. @default "16px" */
  public defaultNodeFontSize: string = "16px";
  /** Canvas Background. Expects a url or path to imagefile */
  public canvasBackground: string = "";
  public panSize: {width: string, height: string} | null = null;
  private _nodes: object = {};
  private _edges: object = {};
  private _shapes = new Shapes();

  /**
   * Set's the canvas in instance. If id of element was given it finds the element.
   * @param canvas - HTML element or element id to access for representing nodes and edges.
   * @throws If element id is not found or the given value is not a valid HTML element or id.
   */
  constructor(canvas: string | HTMLElement) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.id = "node-shapes-canvas";
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.style = "width: 100%; height: 100%; box-sizing: border-box;";
    // svg.setAttribute("width", "100");
    // svg.setAttribute("height", "100");

    if (typeof(canvas) == "string") {
      const element = document.getElementById(canvas);
      if (element) {
        element.appendChild(svg);
        this._canvas = svg;
      }
      else throw new Error(`Node Shapes: No such element having an id of '${canvas}' was found!`);
    }
    else {
      canvas.appendChild(svg);
      this._canvas = svg;
    }
    this.injectCSS();
  }

  /**
   * Create's the Node Object.
   * @param text - Text to display inside a node.
   * @param id - By default it uses uuid if not provided explicitly. Must be *unique*!
   * @param shape - Default options are "rectangle" | "circle" | "triangle".
   * @param draggable - Makes nodes object moveable inside canvas. By default it's **False**.
   * @param size - Sets the size (px: pixels) of node by the given width and height. By default it's **{width: "200", height: "40"}**
   * @returns Returns the **Node** Object.
   * @throws If the id isn't a valid id (unique string). 
   */
  public node(text: string, {id, shape, draggable, size}: {id: string, shape: string, draggable: boolean, size: {width: string, height: string}}): Node {
    let edges: Array<object> = [];
    const NODE: Node = new Node(text, id, shape, draggable, size, this);

    return NODE;
  }

  public edge(id: string, from: void, to: void) {
    // 
  }

  get canvas(): SVGSVGElement {
    return this._canvas;
  }

  /**
   * addShape
   */
  public addShape() {
    
  }
  get shapes() {
    return this._shapes;
  }

  get nodes() {
    return this._nodes;
  }
  set nodes(data: object) {
    // 
  }
  private appendNodes(node: Node) {
    // appends the node object in nodes.
  }

  get edges() {
    return this._edges;
  }
  set edges(data) {
    // 
  }

  get canvasPadding(): {inline: number, block: number} {
    if (this._canvasPadding) return this._canvasPadding;
    else return {inline: 0, block: 0};
  }
  set canvasPadding(padding: {inline: number, block: number}) {
    this._canvasPadding = padding;
    this._canvas.style.padding = `${padding.block}px ${padding.inline}px`;
  }

  private injectCSS(): void {
    const style = document.createElement("style");
    style.textContent = `
      .node-shapes-text-shape {
        width: 100%;
        height: 100%;
      }
    `;
    document.head.appendChild(style);
  }
}
export default NodeShapes;
