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

### `convert(imagePath, callback)`
Converts a png image to flat

#### Params
- **String** `imagePath`: The path to the PNG image.
- **Function** `callback`: The callback function.

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