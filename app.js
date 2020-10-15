const {app, BrowserWindow} = require('electron');
 
let mainWindow = null;




app.on('ready', () => {
    console.log("app started");
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        }
    });
    mainWindow.webContents.loadFile('index.html');
})

