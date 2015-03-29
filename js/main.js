var exec = require('./exec.js');
var editor1 = require('./editor.js').editor1;
var editor2 = require('./editor.js').editor2;
var editor3 = require('./editor.js').editor3;

//require('./editor.js').init();

//console.log(editor1)
//console.log(editor3)
document.getElementById('run').onclick = function(){

  var str = editor1.getValue().concat(editor2.getValue())

  try{
    var result = eval(str);
    console.log(result);
    editor3.setValue(result.toString());
    editor3.clearSelection();
  }catch(e){
    editor3.insert(e.toString());
    return;
  }
  exec(str);
}