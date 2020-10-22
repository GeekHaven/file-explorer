let os = require("os");
const fs = require("fs");
const path = require("path");
const remote = require("electron").remote;
const win = remote.getCurrentWindow();
const { shell } = require('electron');
const app = require('electron').remote.app;

var node = document.getElementById("myList");

document.onreadystatechange = (event) => {
  if (document.readyState == "complete") {
    handleWindowControls();
  }
};

window.onbeforeunload = (event) => {
  win.removeAllListeners();
};

function handleWindowControls() {
  document.getElementById("min-button").addEventListener("click", (event) => {
    win.minimize();
  });

  document.getElementById("close-button").addEventListener("click", (event) => {
    win.close();
  });

  document.getElementById("devbtn").addEventListener("click", (e) => {
    if (!win.webContents.isDevToolsOpened()) {
      win.webContents.openDevTools();
    } else {
      win.webContents.closeDevTools();
    }
  });
}

const printdirectory = () => {
  dir_home = os.homedir();
  console.log(dir_home);
  return dir_home;
};

const getFilesandFolder = (folderPath) => {
  try{
  var homenames = fs.readdirSync(folderPath);
  node.innerHTML='';
  homenames.forEach((file) => {
    try{
      var filePath = path.join(folderPath, file);
    var stat = fs.statSync(filePath);
    if (stat.isFile()) {
      console.log("The is a File" + file);
      var toAddnode = document.createElement("LI");
      toAddnode.onclick = function() {openFile(filePath)};
      var textnode = document.createTextNode(file);
      toAddnode.appendChild(textnode);
      node.appendChild(toAddnode);
    }
    else if (stat.isDirectory()) {
      console.log("The is a Directory" + file);
      var toAddnode = document.createElement("LI");
      toAddnode.onclick=function() {getFilesandFolder(filePath)};
      var textnode = document.createTextNode(file);
      toAddnode.appendChild(textnode);
      node.appendChild(toAddnode);
    }
    }
    catch(err){
      console.log(err);
    }
  });
}
catch(err){
  alert(err);
}
};

function openFile(filePath){
  shell.openPath(filePath);
}

getFilesandFolder(printdirectory());

function showDir(){
  var dirPath = document.getElementById('directory').value;
    getFilesandFolder(dirPath);
}

var dirList = new Set();
function dirListing(dir){
  var files = fs.readdirSync(dir);
  for(var x in files){
    try{
    var next = path.join(dir,files[x]);
    if (fs.lstatSync(next).isDirectory()==true){
      dirList.add(next)
      dirListing(next);
    }
  }
  catch(err){
    console.log(err);
    continue;
  }
  }
}


function searchResult(){
  var fileName = document.getElementById('fileName').value;
  node.innerHTML='';
  dirList.forEach((file) => {
    if(file.replace(/^.*[\\\/]/, '')==fileName){
      var toAddnode = document.createElement("LI");
      toAddnode.onclick=function() {getFilesandFolder(file)};
      var textnode = document.createTextNode(file);
      toAddnode.appendChild(textnode);
      node.appendChild(toAddnode);
    }
  });
}