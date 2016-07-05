var res = [{}];
var num = 0;
var fs = require('fs');

function readLines(input, func) {
    var remaining = '';

    input.on('data', function (data) {
        remaining += data;
        var index = remaining.indexOf('\n');
        while (index > -1) {
            var line = remaining.substring(0, index);
            remaining = remaining.substring(index + 1);
            func(line);
            index = remaining.indexOf('\n');
        }
    });

    input.on('end', function () {
        if (remaining.length > 0) {
            func(remaining);
        }
    });
}


function func(data) {
    //console.log(res);
    switch (data.substr(0, 1)) {
    
        case '':
            num += 1;
            res[num] = {};
            break;

        default:
            // code
            var field = data.split(': ')[0];
            var value = data.split(': ')[1];
            res[num][field] = value;
    }
}

var input = fs.createReadStream('sample_movies.txt');
readLines(input, func);

setTimeout(function () {
    console.log(res)
}, 10);
