let os = require("os");
const fs = require("fs");
const path = require("path");
const remote = require("electron").remote;
const win = remote.getCurrentWindow();

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

const getFilesandFolder = () => {
  let home = printdirectory();
  homenames = fs.readdirSync(home);
  homenames.forEach((file) => {
    var filePath = path.join(home, file);
    var stat = fs.statSync(filePath);
    if (stat.isFile()) {
      console.log("The is a File" + file);
      var node = document.createElement("LI");
      var textnode = document.createTextNode(file);
      node.appendChild(textnode);
      document.getElementById("myList").appendChild(node);
    } else if (stat.isDirectory()) {
      console.log("The is a Directory" + file);
      var node = document.createElement("LI");
      var textnode = document.createTextNode(file);
      node.appendChild(textnode);
      document.getElementById("myList").appendChild(node);
    }
  });
};

getFilesandFolder();
