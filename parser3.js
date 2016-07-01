var res = [{}];
var num = 0;
var fs = require('fs');
var array = fs.readFileSync('sample_movies.txt').toString().split("\n");
array.forEach((line) => {
  switch (line.substr(0, 2)) {
    case '':
      num+=1;
      res[num] = {};
      break;
    case 'St':
      var field = line.split(': ')[0];
      var stars = line.split(': ')[1]
      console.log('Stars string ' + stars);
      
      stars = stars.split(', ');
      console.log('Stats arraY : ')
      console.log(stars);
      res[num][field]=[[stars]];
    default:
      // code
      var field = line.split(': ')[0];
      var value = line.split(': ')[1];
      res[num][field]=value;
  }
})

console.log(res)