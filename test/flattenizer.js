var Flattenize = require ("../index")
  , myImage = new Flattenize ()
  ;

myImage.convert(process.argv[2]);
