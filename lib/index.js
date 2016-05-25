// dependencies
var fs = require('fs')
  , PNG = require('pngjs').PNG
  , ImageMagick = require("imagemagick")
  , FlatColors = require("flatcolors")
  , Request = require('request')
  , typpy = require("typpy")
  ;

/**
 *  This function converts the image from options.imagePath to a png format.
 *
 */
function convertToPng (options, callback) {

    // get the instance
    var self = this;

    // options that will be passed to convert function
    var tmpPath = "image-" + Math.random().toString(36) + ".png";

    // get the image size
    ImageMagick.identify(options.imagePath, function (err, imageData){

        // handle error
        if (err) { return callback (err); }

        // convert the image
        ImageMagick.convert([
            options.imagePath
          , tmpPath
        ], function(err, stdout){

            // handle error
            if (err) { return callback (err); }

            // callback
            callback (null, tmpPath);
        });
    });
}

var Flattenize = function (options) {

    // build the instance
    var self = this;

    /**
     * convert
     * Converts a png image to flat
     *
     * @name convert
     * @function
     * @param {String} imagePath The path to the PNG image.
     * @param {Function} callback The callback function.
     */
    self.convert = function (imagePath, callback) {


        // force image path to be a string
        imagePath = String (imagePath);

        // force callback to be a function
        callback = callback || function () {};
        if (typeof callback !== "function") {
            throw new Error ("Callback must be a function");
        }

        // the string begins with https or http
        if (/^https?:\/\//.test(imagePath)) {

            // generate a tmp path
            var tmpPath = "image-" + Math.random().toString(36);

            // download the image
            Request(imagePath)
                .pipe(fs.createWriteStream(tmpPath))
                .on('close', function () {
                    self.convert (tmpPath, function (err, data) {
                        callback (err, data);
                        fs.unlink (tmpPath);
                    });
                });
            return;
        }

        // convert to png
        convertToPng.call (self, {
            imagePath: imagePath
        }, function (err, tmpPath) {

            // handle error
            if (err) { return callback (err); }

            // read the image
            var stream = fs.createReadStream(tmpPath).pipe(new PNG({ filterType: 4 }));

            // image parsed
            stream.on("parsed", function () {

                for (var y = 0; y < this.height; ++y) {
                    for (var x = 0; x < this.width; ++x) {
                        var idx = (this.width * y + x) << 2
                          , rgb = [
                                this.data[idx]
                              , this.data[idx + 1]
                              , this.data[idx + 2]
                            ]
                          , newRgb = FlatColors(rgb)
                          ;

                        this.data[idx] = newRgb[0];
                        this.data[idx + 1] = newRgb[1];
                        this.data[idx + 2] = newRgb[2];
                    }
                }

                this.pack().pipe(fs.createWriteStream('out.png'));
            });
        });
    }

    self._flatColors = FlatColors._colors;
    return self;
};


module.exports = Flattenize;
