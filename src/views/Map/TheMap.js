import React, {useState, useEffect} from 'react';
import Tree from 'react-d3-tree';
import axios from "axios";

const treeTest = [
  {
    name: 'Miami, Florida',

    children: [
      {
        name: 'Jacksonville',
        attributes: {
          State: 'Florida'
        },
    children:[
      {
        name: 'Test',
        attributes: {
          State: 'GA'
        }
      }
    ]

      },
      {
        name: 'THIS IS A TEST',
        attributes: {
          State: 'Florida'
        },
      },
    ],
  },
];

function TheMap(props) {
  const [myTreeData, setmyTreeData] = useState(treeTest);
  useEffect(() => {
  axios.get('https://we-cant-name-things.herokuapp.com/api/map')
 .then(function (response) {
   setmyTreeData(response.data)
   console.log(response.data);
 })
.catch(function (error) {
   console.log(error);
});
  }, [])
  return(
    <div id="treeWrapper" style={{width: '100%', height: '90em', 'background': 'white'}}>
          <Tree data={myTreeData} orientation={'vertical'} translate={{x: 400, y: 200} } initialDepth={1} separation={{siblings: 2, nonSiblings: 2.2}}/>
    </div>
  )
}

export default TheMap

//dev notes:
{/*
  add styles={{}}

  The tree's styles prop may be used to override any of the tree's default styling. 
  The following object shape is expected by styles:

{
  links: <svgStyleObject>,
  nodes: {
    node: {
      circle: <svgStyleObject>,
      name: <svgStyleObject>,
      attributes: <svgStyleObject>,
    },
    leafNode: {
      circle: <svgStyleObject>,
      name: <svgStyleObject>,
      attributes: <svgStyleObject>,
    },
  },
}
where <svgStyleObject> is any object containing CSS-like properties that are compatible 
with an <svg> element's style attribute, for example:
{
  stroke: 'blue',
  strokeWidth: 3,
}


so we need to ask the backend "what is my current location", and then go through the tree and compare
if current_location == name, if True, then {color: 'red'} that node/leafNode.

*/}
