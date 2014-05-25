// dependencies
var fs = require('fs')
  , PNG = require('pngjs').PNG
  , ImageMagick = require("imagemagick")
  , FlatColors = require("./node-flatcolors/index")
  , Request = require('request');
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

/**
 *  Flattenize
 *  Convert an image to flat ui.
 *
 *  ===============================
 *  Licensed under the MIT license:
 *  The MIT License (MIT)
 *
 *  Copyright (c) 2014 Ionică Bizău
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in all
 *  copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 *  SOFTWARE.
 *
 */
var Flattenize = function (options) {

    // build the instance
    var self = this;

    // use 'new'
    if (this.constructor !== Flattenize) {
        throw new Error ("Use 'new' keyword to create the Flattenize instance");
    }

    /**
     *  Flattenize#convert
     *  Converts a png image to flat
     *
     *  Arguments
     *    @imagePath: the path to the PNG image
     *    @callback: the callback function
     *
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
};

module.exports = Flattenize;
