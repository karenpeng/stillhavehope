var falafel = require('falafel');
var inspect = require('object-inspect');
var Data = require('./dataStructure.js');

module.exports = function (src) {

  var id = 0;
  var nodes = {};
  var level = 0;
  var _obj = [];

  var out = falafel(src, function (node) {
    if (node.type === 'FunctionDeclaration' || node.type === 'FunctionExpression') {
      node.body.update('{' + '_enter(' + id + ',' + level + ',arguments);' + node.body.body
        .map(function (x) {
          return x.source()
        })
        .join(';\n') + '_exit(' + id + ');' + '}'
      );
      nodes[id] = node;
      id++;
      level ++;
    } else if (node.type === 'ReturnStatement') {
      node.argument.update(
        '_exit(' + id + ',' + level + ',' + node.argument.source() + ')'
      );
      nodes[id] = node;
      id++;
      level ++;
    }
  }).toString();

  console.log(out);
  //console.log(nodes);

  var stack = [];
  Function(['_exit', '_enter'], out)(exit, enter);

  function exit(id, level, value) {
    stack.pop();
    var indent = Array(stack.length + 1).join(' ');
    //console.log(indent + value);

    // _obj.push({
    //   'return': value
    // });
    var data = new Data();
    data.param = value;
    data.level = level;
    _obj.push(data);

    return value;
  }

  function enter(id, level, args) {
    var indent = Array(stack.length + 1).join(' ');
    args = [].slice.call(args).map(inspect);
    //console.log(indent + nodes[id].id.name + '(' + args.join(', ') + ')');

    var str = indent + nodes[id].id.name + '(' + args.join(', ') + ')';

    // _obj.push({
    //   'func': str
    // });
    //_obj.push(str);
    var data = new Data();
    //data.param = ndes[id].id.name;
    data.level = level;
    data.param = str;
    _obj.push(data);



    stack.push(id);
  }

  return _obj;

}