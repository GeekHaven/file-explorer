let os = require('os'),

dir_home = os.homedir();

const printdirectory =()=>{
    console.log(dir_home);
    return dir_home;
}

printdirectory();