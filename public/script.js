import NodeShapes from '../src/index';

const text = "Very long text that should wrap into multiple lines inside the rectangle. If it overflows vertically, it must be truncated with an ellipsis after the last visible line.";

const nodeShapes = new NodeShapes("node-shapes-graph");
nodeShapes.canvasPadding = {inline: 20, block: 80};
console.log(nodeShapes);
const node = nodeShapes.node(text, {size: {width: "400", height: "100"}});
node.add();
// node.add();