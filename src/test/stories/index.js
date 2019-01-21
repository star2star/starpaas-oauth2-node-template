import React from "react";
import { storiesOf } from '@storybook/react';
import { Stage, Layer } from "react-konva";
import MyNode from "../../index";


const data = MyNode.generateNewNode();
console.log('xxxxx', data);

const newData = {...data.formData, "definitions": data.definitions}
const TheNode = MyNode.getTabs(newData, null, (action, params) => {
  console.log('story callback called', action, params);
});


const stories = storiesOf('node', module);

stories.add('node ', () => (
  <div style={{ width: '100%', height: '100%', backgroundColor: 'lightgray' }}>
    <Stage width={1000} height={1000}>
      <Layer onDrop={() => {
        console.log('drop');
      }}>
        {MyNode.generateJSXNode({ nodes: [] }, data, 0, { x: 48, y: 200 }, (a, b) => {
          console.log('nodeaction', a, b);
        },
          (a, b) => {
            console.log('clickaction', a, b);
          },
          (a, b) => {
            console.log('moveaction', a, b);
          },
          { width: 1000, height: 1000 },
          true // show errors
        )}
      </Layer>
    </Stage>

  </div>
));

stories.add('right panel Tab 0', () => (
  <div style={{ width: '100%', height: '100%', backgroundColor: 'lightgray' }}>
    {TheNode[0].tabFunc()}
  </div>
));

if (TheNode.length > 1) {
  stories.add('right panel Tab 1', () => (
    <div style={{ width: '100%', height: '100%', backgroundColor: 'lightgray' }}>
      {TheNode[1].tabFunc()}
    </div>
  ));
}


