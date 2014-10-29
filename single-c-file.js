var fs = require('fs');
var newFile = ['//This file was created with Single-C-File by Adrian Dawid.'];

function addFile(fileContent)
{
  for(lineNr in fileContent)
  {
      if(fileContent[lineNr].substring(0,2) != "//")
      {
        newFile.push(fileContent[lineNr]);
      }
  }
}

function merge(file,newFileName)
{
  for(lineNr in file)
  {
      if(file[lineNr])
      {
          var array = fs.readFileSync(file[lineNr]).toString().split("\n");
          addFile(array);
      }
  }
  var tmpFile = fs.createWriteStream(newFileName);
  tmpFile.on('error', function(err) {
    console.log("File could not be saved!")
    });
  for(lineNr in newFile)
  {
    tmpFile.write(newFile[lineNr] + "\n");
  }
  tmpFile.end();
}

function main()
{
  var fileName = "none";
  console.log("Single-C-File by Adrian Dawid. \nCopyright 2014 Adrian Dawid. \nThis software is licensed under the MIT-License!");
  fileName = process.argv[2];
  //Was there an argument?
  if(!fileName)
  {
    console.log("You have to enter a file name!");
    //Quits the application.
    return;
  }
  console.log("Using:%s",fileName);
  //Reading the contents of the file
  var mainFile;
  fs.readFile(fileName, function (err, data) {
      if (err)
      {
        console.log("The specefied file could not be opened or does not exist!");
        return;
      }
      var array = data.toString().split("\n");
      var newFileName = fileName.split(".")[0] + "_merged.cxx";
      merge(array,newFileName);
  });
}

//Start the main function
main();
