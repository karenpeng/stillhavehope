var parse = require('./parse.js');

function fibonacci(num){
  if(num ===0) return 0;
  if(num ===1) return 1;
  return fibonacci(num -1) + fibonacci(num -2);
}

var fib = fibonacci.toString();

var call = 'fibonacci(3);'

var result = parse(fib.concat(call));

result.forEach(function(data){
  console.log(data)
})