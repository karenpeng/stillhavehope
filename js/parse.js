var falafel = require('falafel');
var inspect = require('object-inspect');

module.exports = function (src) {
  var id = 0;
  var nodes = {};
  var _obj = [];

  var body = falafel(src, function (node) {
    switch (node.type) {
    case 'FunctionExpression':
    case 'FunctionDeclaration':
      return updateDeclaration(node);
    case 'ReturnStatement':
      return updateReturn(node);
    }
  });
  return Function(['_enter', '_exit'], body);
}

function updateDeclaration(node) {
  var insideBody = node.body.body.map(function (x) {
    return x.source();
  }).join(';\n');

  var enter = '{\n' +
    '_enter("' + node.id.name +'", arguments);\n';
  var exit = '\n_exit();\n}';
  node.body.update(enter + insideBody + exit);
}

function updateReturn(node) {
  if (!node.argument) {
    node.update('return _exit()');
    return;
  }
  node.argument.update(
    '_exit(' + node.argument.source() + ')'
  );
}