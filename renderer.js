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

class mapElement{
  constructor(){
    this.path;
    this.next;
    this.prev;
  }
}
var curr = new mapElement();
var cond =1;
var ptr = new mapElement();
curr.path = os.homedir();
ptr=curr;

const getFilesandFolder = (folderPath) => {
  try{
    if(cond===0)
    {
      var newDir = new mapElement();
      newDir.path = folderPath;
      newDir.prev = curr;
      curr.next = newDir;
      curr = newDir;
      ptr = curr;
    }
    var homenames = fs.readdirSync(folderPath);
    node.innerHTML='';
    homenames.forEach((file) => {
      try{
        var filePath = path.join(folderPath, file);
      var stat = fs.statSync(filePath);
      if (stat.isFile()) {
        console.log("The is a File " + file);
        var toAddnode = document.createElement("LI");
        toAddnode.onclick = function() {openFile(filePath)};
        var textnode = document.createTextNode(file);
        toAddnode.appendChild(textnode);
        node.appendChild(toAddnode);
      }
      else if (stat.isDirectory()) {
        console.log("The is a Directory " + file);
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
  cond = 0;
};

function openFile(filePath){
  shell.openPath(filePath);
}

getFilesandFolder(printdirectory());

function showDir(){
  var dirPath = document.getElementById('directory').value;
  cond=0;
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
  cond=1;
  var fileName = document.getElementById('fileName').value;
  node.innerHTML='';
  var flag=0;
  dirList.forEach((file) => {
    if(fileName != curr.path.replace(/^.*[\\\/]/, '')){
      cond =0;
    }
    if(file.replace(/^.*[\\\/]/, '')==fileName){
      flag=1;
      var toAddnode = document.createElement("LI");
      toAddnode.onclick=function() {getFilesandFolder(file)};
      var textnode = document.createTextNode(file);
      toAddnode.appendChild(textnode);
      node.appendChild(toAddnode);
    }
  });
  if(flag===0){
    alert('No Folder Found');
    getFilesandFolder(curr.path);
  }
}


var tmp = new mapElement();
tmp = curr;

function goBack(){
  try{
  tmp = ptr;
  ptr = ptr.prev;
  curr = curr.prev;
  console.log(ptr.path);
  cond=1;
  getFilesandFolder(ptr.path);
  }
  catch(err){
    ptr = tmp;
    curr =tmp;
    console.log(tmp.path);
  }

}

function goFwd(){
  try{
    tmp = ptr;
    curr = curr.next;
    ptr = ptr.next;
    console.log(ptr.path);
    cond=1;
    getFilesandFolder(ptr.path);
  }
  catch(err){
    ptr = tmp;
    curr = tmp;
    console.log(tmp.path);
  }
}
