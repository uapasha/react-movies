var fs = require('fs');

var parser = function() {
    var res = [{}];

    var num = 0;

    var data = fs.readFileSync('sample_movies.txt').toString().split("\n");
    data.forEach((line) => {
        line = line.replace('\r', '');

        switch (line.substr(0, 2)) {
            case '':
                console.log(line)
                num += 1;
                res[num] = {};
                break;
            case 'St':
                var field = line.split(': ')[0].toLowerCase();
                var stars = line.split(': ')[1];
                stars = stars.split(', ');
                res[num][field] = stars;
                break;
            case "Re":
                var field = 'year';
                var value = line.split(': ')[1];
                res[num][field] = value;
                break;
            default:
                // code
                var field = line.split(': ')[0].toLowerCase();
                var value = line.split(': ')[1];
                res[num][field] = value;
        }
    });
    //console.log(res);
    return res
};

module.exports = parser;