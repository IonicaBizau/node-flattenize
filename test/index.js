var Flattenize = require ("../index")
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
