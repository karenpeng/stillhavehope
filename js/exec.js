var parse = require('./parse.js');

module.exports = function (src, maxLevel) {
  var parsed = parse(src);
  // console.log(parsed.toString())
  var level = 0;
  try {
    parsed(enter, exit);
  } catch (err) {
    if (err.name === 'MAX_CALL_STACK') {
      console.log(err.message);
    }
  }

  function enter(name, args) {
    level++;
    if (level > maxLevel) {
      var err = new Error('Maximum call stack size exceeded');
      err.name = 'MAX_CALL_STACK';
      throw err;
    }
    args = [].slice.call(args);
    console.log('call: %s(%s), level: %s', name, args.join(','), level);
  }

  function exit(value) {
    level--;
    console.log('value: ', value, 'level: ', level);
    return value;
  }
}