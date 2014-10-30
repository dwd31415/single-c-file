var fs = require('fs');
var newFile = ['//This file was created with Single-C-File by Adrian Dawid.'];
var macros = ['PARSER_IS_SINGLE_C_FILE'];

function addFile(fileContent)
{
  var readerActive = true;
  for(lineNr in fileContent)
  {
    if(fileContent.length < lineNr + 2)
    {
      if(fileContent[lineNr].substring(0,2) != "//" && fileContent[lineNr].substring(0,10) != "#include \"" && fileContent[lineNr].substring(0,9) != "#include\""
         && fileContent[lineNr].substring(0,6) != "#ifdef" && fileContent[lineNr].substring(0,7) != "#ifndef" && fileContent[lineNr].substring(0,7) != "#define"
         && fileContent[lineNr].substring(0,6) != "#endif" && readerActive)
      {
        newFile.push(fileContent[lineNr]);
      }
      if(fileContent[lineNr].substring(0,10) == "#include \"" || fileContent[lineNr].substring(0,10) == "#include\"")
      {
        var tmpFileName = fileContent[lineNr].replace("#include \"","");
        try
        {
          tmpFileName = tmpFileName.replace("\"","");
          var array = fs.readFileSync(tmpFileName).toString().split("\n");
          if(array)
          {
            addFile(array);
          }
        }
        catch(err){
          newFile.push(fileContent[lineNr]);
        }
      }
      console.log(fileContent[lineNr]);
      if(fileContent[lineNr].substring(0,6) == "#ifdef")
      {
        var macro = fileContent[lineNr].replace("#ifdef","");
        macro = macro.replace(" ","");
        var macroWasFound = false;
        for(index in macros)
        {
            if(macros[index] == macro)
            {
              macroWasFound = true;
            }
        }
        if(!macroWasFound)
        {
              readerActive = false;
        }
      }
      if(fileContent[lineNr].substring(0,7) == "#ifndef")
      {
        var macro = fileContent[lineNr].replace("#ifndef","");
        macro = macro.replace(" ","");
        var macroWasFound = false;
        for(index in macros)
        {
            if(macros[index] == macro)
            {
              macroWasFound = true;
            }
        }
        if(macroWasFound)
        {
              readerActive = false;
        }
        else{
          newFile.push(fileContent[lineNr]);
        }
      }
      if(fileContent[lineNr].substring(0,7) == "#define")
      {
        var macro = fileContent[lineNr].replace("#define","");
        macro = macro.replace(" ","");
        macros.push(macro);
        if(readerActive)
        {
            newFile.push(fileContent[lineNr]);
        }
      }
      if(fileContent[lineNr].substring(0,6) == "#endif")
      {
        if(readerActive)
        {
            newFile.push(fileContent[lineNr]);
        }
        readerActive = true;
      }
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
    console.log("You have to specify a file name! \n Use this tool like this: \nnode single-c-file.js <project-defination-filename>");
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
