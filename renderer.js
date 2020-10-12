let os = require('os');
const fs = require("fs"); 
const path = require('path');

const printdirectory =()=>{
    dir_home = os.homedir();
    console.log(dir_home);
    return dir_home;
} 

const getFilesandFolder = ()=>{
    let home = printdirectory();
    fs.readdirSync(home, { withFileTypes: true }).map((file)=>{
        console.log({name:file.name, isDir: !file.isFile()})
    })    

}

getFilesandFolder();