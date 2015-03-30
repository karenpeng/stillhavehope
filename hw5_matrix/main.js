var Mat4 = require('./mat4.js')
var Vec4 = require('./vec4.js')
var operate = require('./operate.js')
var GL = require('./gl.js')
var theta = 0

var Tree = require('./tree.js');

var instructions = require('./tempData.js');

canvas = document.getElementById('canvas1')
context = canvas.getContext('2d')
w = canvas.width
h = canvas.height

DISTANCE_FROM_CAMERA_TO_ZERO = 6
FOV = 45
ASPECT = w / h
NEAR = 1
FAR = 2200

var gl;

function init() {
  gl = new GL('canvas1');
  gl.initCamera(FOV, ASPECT, NEAR, FAR);
  gl.cameraPosition(0, 0, DISTANCE_FROM_CAMERA_TO_ZERO)

}

var a = 0,
  b = 0;

window.onmousemove = function (e) {
  a = (e.pageX - w / 2) / (w / 2)
  b = (e.pageY - h / 2) / (w / 2)
}
var drawInstructions = [];

function render() {
  context.fillStyle = 'black';
  context.clearRect(0, 0, canvas.width, canvas.height)

  var time = Date.now() * 0.001
  var x = Math.cos(time)
  var y = Math.sin(time)
  gl.reset();

  // gl.rotateX(a)
  // gl.rotateY(b)

  //makeDrawInstructions();
  // drawInstructions.forEach(function(item){

  // })
  drawAcorddingInstruction(drawInstructions);
}

function animate() {
  requestAnimationFrame(animate)
  render()
}

function drawThings(pointArray, edgeArray, color) {
  for (var i = 0; i < edgeArray.length; i++) {
    var pointToDraw1 = gl.drawPoint(pointArray[edgeArray[i][0]]);
    var pointToDraw2 = gl.drawPoint(pointArray[edgeArray[i][1]]);

    lineBetweenPoints(pointToDraw1, pointToDraw2, color);
  }
}

function lineBetweenPoints(p1, p2, color) {
  context.beginPath();
  context.strokeStyle = color;
  context.moveTo(p1[0], p1[1]);
  context.lineTo(p2[0], p2[1]);
  context.stroke();
}

function draw(txt) {
  context.fillStyle = 'white';
  var p1 = gl.drawPoint([-1, 1, 0, 1]);
  context.font = 'italic 20pt Calibri';
  context.fillText(txt, p1[0], p1[1]);
}

//this should be in a setInterval!!!!
function makeDrawInstructions(instructions) {
  var curLevel = 0;
  //gl.scale(2, 2, 2);
  //
  function lol(i) {
    var curItem = instructions[i];

    if (curItem.level > curLevel) {

      drawInstructions.push(['down', curItem])
      curLevel = curItem.level;

    } else {

      if (curItem.hasOwnProperty('call')) {

        //everything since the last level
        var lastIndex;
        for (var j = drawInstructions.length - 1; j > 0; j--) {
          var item = drawInstructions[j];
          if (item[item.length - 1].level < curItem.level) {
            lastIndex = j;
            break;
          }
        }

        var levelGap = curLevel - curItem.level;
        var lastOne = drawInstructions[lastIndex + 1];
        lastOne = ['left'].concat(lastOne);

        var pops = [];
        for (var j = 0; j < levelGap - 1; j++) {
          pops.push('up');
        }
        drawInstructions.push(pops.concat(['right', curItem]));
        curLevel = curItem.level;

      } else if (curLevel - curItem.level === 1) {

        var lastOne = drawInstructions[drawInstructions.length - 1];
        lastOne[lastOne.length - 1] = curItem;

      } else if (curLevel - curItem.level > 1) {

        var levelGap = curLevel - curItem.level;
        //everything since the last level
        var lastIndex;
        for (var j = drawInstructions.length - 1; j > 0; j--) {
          var item = drawInstructions[j];
          if (curItem.level - item[item.length - 1].level === levelGap) {
            lastIndex = j;
            break;
          }
        }

        var lastOne = drawInstructions[lastIndex + 1];
        lastOne = ['left'].concat(lastOne);
        lastOne[lastOne.length - 1] = curItem;
        var pops = [];
        for (var j = 0; j < levelGap - 1; j++) {
          pops.push('up');
        }
        drawInstructions.push(pops.concat(['right', curItem]));
        curLevel = curItem.level;
      }
    }

  }

  for (var i = 0; i < instructions.length; i++) {

    //console.log(curItem)
    //gl.reset();
    lol2(i);
  }

  function lol2(num) {
    setTimeout(function () {
      lol(num);
    }, 1000 * num);
  }

}

makeDrawInstructions(instructions);

//keep revising the instructions
//and draw the whole instruction every flame
//
function drawAcorddingInstruction(todo) {
  for (var i = 0; i < todo.length; i++) {
    // if (typeof todo[i] === 'string') {
    //   switch (todo[i]) {
    //   case '[':
    //     break;
    //   case ']':
    //     break;
    //   case 'left':
    //     gl.translate(-0.2, 0, 0);
    //     break;
    //   case 'down':
    //     gl.translate(0, -0.2, 0);
    //     break;
    //   case 'right':
    //     gl.translate(0.2, 0, 0);
    //     break;
    //   }
    // } else if (typeof todo[i] === 'object') {
    //   if (todo[i].hasOwnProperty('call')) {
    //     draw(todo[i].call);
    //   }
    //   if (todo[i].hasOwnProperty('value')) {
    //     //console.log(todo[i])
    //     draw(todo[i]['value']);
    //   }
    // }
    for (var j = 0; j < todo[i].length; j++) {
      var item = todo[i][j];
      if (typeof item === 'string') {
        switch (item) {
        case 'left':
          gl.translate(-0.2, 0, 0);
          break;
        case 'down':
          gl.translate(0, -0.2, 0);
          break;
        case 'right':
          gl.translate(0.2, 0, 0);
          break;
        case 'up':
          gl.translate(0, 0.2, 0);
          break;
        }
      } else if (typeof item === 'object') {
        if (item.hasOwnProperty('call')) {
          draw(item.call);
        } else if (item.hasOwnProperty('value')) {
          draw(item.value);
        }
      }
    }
  }
}

function lerp(org, dis) {

}

function toTheBottom() {
  return false;
}

init();
//render();
animate()