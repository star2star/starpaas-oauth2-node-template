import {
  configure,
  addDecorator
} from '@storybook/react';




function loadStories() {
  // do code here to load stories 
  //require('../stories/' + this.dialect + '.js');

  //const nodeStories = require.context("../stories/", true, /\.js$/);
  require('../stories');
  //console.log('-----', nodeStories);
}

 

configure(loadStories, module);