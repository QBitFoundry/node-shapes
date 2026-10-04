# Node Shapes
Node shapes is an npm package (node-shapes) which allow to create nodes and render them as shapes in a canvas that can be dragged (moved).

[![0.0.1](https://static-production.npmjs.com/da3ab40fb0861d15c83854c29f5f2962.png) npm package](https://www.npmjs.com/package/node-shapes)

### Shapes
You can add more custom shapes. This package have default shapes which include:
- rectangle
- circle (being developed)

## How to Install
To install npm package make sure you have npm installed and access to the internet.

Open your terminal and under your project run the following command:
```
npm install node-shapes
```
**Note:** Make sure to run through the setup to setup shapes.

## How to Setup
To set up the shapes run the following command:
```
npx node-shapes init
```
This will create a new folder as `default-shapes` within your project's `public` folder. This folder is where all the shapes will exist. You can add custom shapes within this folder as well. To keep custom shapes organized from the default shapes, it is recommended that you keep custom shapes in there own dedicated folder created inside `public/default-shapes`.