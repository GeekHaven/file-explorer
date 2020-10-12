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
    homenames = fs.readdirSync(home);
    homenames.forEach(file => { 
        console.log(file); 
    }); 
}

getFilesandFolder();