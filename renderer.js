let os = require('os');
const fs = require("fs");
const path = require('path');

const printdirectory =()=>{
    dir_home = os.homedir();
    console.log(dir_home);
    return dir_home;
}

function isFile(file, callback) {
   var start = 0; //start byte
   var stop = 4; // end byte - to avoid read all the content
   var reader = new FileReader();
   reader.onloadend = function (evt) {
       if (evt.target.readyState == FileReader.DONE) {
           var binary = "";
           var bytes = new Uint8Array(evt.target.result);
           var length = bytes.byteLength;
           if (length == 0) {
               callback(false);
           } else {
               callback(true);
           }
       } else {
           callback(false);
       }
   };
   var blob = file.slice(start, stop + 1);
   reader.readAsArrayBuffer(blob);
}

const getFilesandFolder = ()=>{
    let home = printdirectory();
    homenames = fs.readdirSync(home);
    homenames.forEach(file => {
      isFile(file, function (e) {
      console.log( e ? "It's a File": "Nope ! It's a Folder");
  });
    });
}

getFilesandFolder();
