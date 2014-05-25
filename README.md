# node-flattenize
An experiment for converting images in flat equivalents.

## Installation
Run the following commands to download and install the application:

```sh
$ git clone git@github.com:IonicaBizau/node-flattenize.git flattenize
$ cd flattenize
$ npm install
```

## Example

```js
var Flattenize = require ("flattenize")
  , myImage = new Flattenize ()
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

## How to contribute

1. File an issue in the repository, using the bug tracker, describing the
   contribution you'd like to make. This will help us to get you started on the
   right foot.
2. Fork the project in your account and create a new branch:
   `your-great-feature`.
3. Commit your changes in that branch.
4. Open a pull request, and reference the initial issue in the pull request
   message.

## License
See the [LICENSE](./LICENSE) file.
