var ace = require('brace');
require('brace/mode/javascript');
require('brace/theme/monokai');

var editor1, editor2, editor3;

function init(){
//console.log('ss')
editor1 = ace.edit('editor1');
editor1.getSession().setMode('ace/mode/javascript');
editor1.setTheme('ace/theme/monokai');

editor2 = ace.edit('editor2');
editor2.getSession().setMode('ace/mode/javascript');
editor2.setTheme('ace/theme/monokai');
editor2.setValue('fibonacci();');
editor2.clearSelection();
editor2.moveCursorTo(1,8);
//console.log(editor2.getCursorPosition())

editor3 = ace.edit('editor3');
editor3.setReadOnly(true);
editor3.setOptions({
  highlightActiveLine: false,
  highlightGutterLine: false
});

editor3.renderer.$cursorLayer.element.style.opacity = 0;
//editor.getSession().setMode('ace/mode/javascript');
//editor.setTheme('ace/theme/monokai');



function fibonacci(num){
  if(num ===0) return 0;
  if(num ===1) return 1;
  return fibonacci(num -1) + fibonacci(num -2);
}
editor1.setValue(fibonacci.toString());
editor1.clearSelection();
}

init();

module.exports = {
  editor1: editor1,
  editor2: editor2,
  editor3: editor3
}