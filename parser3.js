var res = [{}];
var num = 0;
var fs = require('fs');
var array = fs.readFileSync('sample_movies.txt').toString().split("\n");
array.forEach((line) => {
  switch (line.substr(0, 1)) {
    case '':
      num+=1;
      res[num] = {};
      break;
    
    default:
      // code
      var field = line.split(': ')[0];
      var value = line.split(': ')[1];
      res[num][field]=value;
  }
})

console.log(res)