// Types
type QueryOptions = {
  table: string;
  [key: string]: any;
};
// For canvas size
type CanvasSize = {
  width: number;
  height: number;
  widthUnit: string;
  heightUnit: string;
}
// For node & edge data
type ShapeData = {
  [key: string]: any;
}

export type {QueryOptions, CanvasSize, ShapeData};