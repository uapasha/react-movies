var multer = require('multer');
var path = require('path');

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        var dir = path.join(__dirname, '../', 'uploads/');
        callback(null, dir);
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now());
    }
});

var limitOptions = {
    limits: {
        fieldNameSize: 100,
        files: 1,
        fields: 5,
        fileSize: 1000000
    }
};
var upload = multer({storage: storage}, limitOptions).single('moviesFile');
module.exports = upload;