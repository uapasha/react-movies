var res = [{}];
var num = 0;
var fs = require('fs');
fs.readFile('sample_movies.txt', function(err, data) {
    if(err) throw err;
    var array = data.toString().split("\n");
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
});


setTimeout(function() {console.log(res)}, 10);