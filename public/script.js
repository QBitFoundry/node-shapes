import NodeShapes from '../src/index';

const text = "Sample Text";

const nodeShapes = new NodeShapes("node-shapes-graph");
nodeShapes.canvasPadding = {inline: 20, block: 20};
console.log(nodeShapes);
const node = nodeShapes.node(text, {size: {width: "400", height: "100"}, draggable: true});
node.add();
