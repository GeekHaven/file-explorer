let os = require('os');

const printdirectory =()=>{
    dir_home = os.homedir();
    console.log(dir_home);
    return dir_home;
}

printdirectory();