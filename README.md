# flattenize [![Support this project][donate-now]][paypal-donations]

An experiment for converting images in flat equivalents.

## Installation

```sh
$ npm i flattenize
```

## Example

```js
// Dependencies
var Flattenize = require ("flattenize")
  , myImage = new Flattenize()
  ;

myImage._flatColors.splice(0, myImage._flatColors.length);
myImage._flatColors.push.apply(myImage._flatColors, [
    [255, 255, 255] // white
  , [55,  129, 194] // blue
  , [77,  183, 73]  // green
  , [229, 67,  60]  // red
  , [252, 211, 9]   // yellow
]);

myImage.convert("http://www.steegle.com/images/chrome.jpg");
```

## Documentation

### `convertToPng()`
This function converts the image from options.imagePath to a png format.

### `Flattenize()`
 Convert an image to flat ui.

 ===============================
 Licensed under the MIT license:
 The MIT License (MIT)

 Copyright (c) 2014 Ionică Bizău

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.

### `convert()`
Flattenize#convert
 Converts a png image to flat

 Arguments

## How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].

## Where is this library used?
If you are using this library in one of your projects, add it in this list. :sparkles:

## License

[KINDLY][license] © [Ionică Bizău][website]

[license]: http://ionicabizau.github.io/kindly-license/?author=Ionic%C4%83%20Biz%C4%83u%20%3Cbizauionica@gmail.com%3E&year=2014

[website]: http://ionicabizau.net
[paypal-donations]: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=RVXDDLKKLQRJW
[donate-now]: http://i.imgur.com/6cMbHOC.png

[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md