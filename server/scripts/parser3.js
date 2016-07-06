var fs = require('fs');

var parser = function (filepath) {
    var res = [{}];

    var num = 0;

    var data = fs.readFileSync(filepath).toString().split("\n");

    data.forEach((line) => {
        line = line.trim();

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
                // avoid ':' in the title of the movie
                var field = line.substring(0, line.indexOf(':')).toLowerCase();
                var value = line.substring(line.indexOf(':') + 2);
                res[num][field] = value;
        }
    });

    return res
};
module.exports = parser;