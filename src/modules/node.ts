// import packages
import {v4 as uuid4} from 'uuid';

// import utils
import { NodeFunctions } from '../utils/node.js';

// import types
import type NodeShapes from '../index.js';

class Node {
  private text: string;
  private id: string;
  private shape: string;
  private draggable: boolean;
  private nodeShapes: NodeShapes;
  private size: {width: string, height: string};
  private canvas: SVGSVGElement;
  private canvasPadding: {inline: number, block: number};

  constructor(text: string = "", id: string = uuid4(), shape: string = "rectangle", draggable: boolean = false, size: {width: string, height: string} = {width: "200", height: "40"}, nodeShapes: NodeShapes) {
    this.text = text;
    this.id = id;
    this.shape = shape;
    this.draggable = draggable;
    this.nodeShapes = nodeShapes;
    this.size = size;
    this.canvas = nodeShapes.canvas;
    this.canvasPadding = nodeShapes.canvasPadding;
  }

  /**
   * Add's the node to visual representation (canvas an HTML element)
   */
  public async add() {
    // console.log(this.nodeShapes.shapes.defaultShapes[this.shape]);
    
    const svg = await this.nodeShapes.shapes.getShapeSVG(this.shape) as string;
    
    const parser = new DOMParser();
    const xml = parser.parseFromString(svg, "image/svg+xml");

    const svgElement = xml.querySelector('svg');
    if(!svgElement) throw new Error(`Target <svg> tag not found.`);
    svgElement.id = `svg_${this.id}`;
    svgElement.setAttribute("draggable", "true");
    svgElement.setAttribute("width", this.size.width);
    svgElement.setAttribute("height", this.size.height);
    svgElement.setAttribute("viewBox", `0 0 ${this.size.width} ${this.size.height}`);
    
    const gElement = xml.querySelector('g');
    if(!gElement) throw new Error(`Target <g> tag not found.`);

    const foreignObject = xml.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
    foreignObject.id = `node-shapes-text-foreign-object_${this.id}`;
    foreignObject.setAttribute("width", this.size.width);
    foreignObject.setAttribute("height", this.size.height);
    const textElement: HTMLElement = document.createElement("p");
    textElement.id = `node-shapes-text_${this.id}`;
    textElement.setAttribute("style", `width:100%;
            line-height:1.2em;
            font-size:16px;
            display:-webkit-box;
            -webkit-box-orient:vertical;
            overflow:hidden;
            text-align:center;
            color: rgba(0,0,0,1);`);
    textElement.innerText = `${this.text}`;
    
    
    foreignObject.innerHTML = `<div xmlns="http://www.w3.org/1999/xhtml" style="height:100%;box-sizing:border-box;padding:8px;display:flex;align-items:center;justify-content:center;">
    ${new XMLSerializer().serializeToString(textElement)}
    </div>`;
    
    gElement.appendChild(foreignObject);
    
    const serializer = new XMLSerializer();
    const createdSVG = serializer.serializeToString(xml);
    
    this.canvas.insertAdjacentHTML("beforeend", createdSVG);
    
    if (await document.getElementById(svgElement.id) != null) {
      const canvas = this.canvas;
      const svg = document.getElementById(svgElement.id) as HTMLElement;
      const foreignObjectElement = document.getElementById(foreignObject.id) as HTMLElement;
      const textObjectElement = document.getElementById(textElement.id) as HTMLElement;
      const nodeFunctions = new NodeFunctions(canvas, this.id, svg, foreignObjectElement, textObjectElement);
      nodeFunctions.paddingInline = this.canvasPadding.inline;
      nodeFunctions.paddingBlock = this.canvasPadding.block;
      nodeFunctions.elipse();
      nodeFunctions.draggable(svgElement.id);
    }
  }

  public get(id: string) {}
  public getAll() {}
  public getJson(id: string) {}
  public getAllJson() {}
  public update() {};
  public remove() {};
}
export default Node;