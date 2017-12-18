#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const config = {};
const dirDelimetr = process.platform === 'win32' ? '\\' : '/';
let isDir = false;
args = process.argv.slice(2);

args.filter(arg => {
    let params = arg.split('=');
    let key = params[0].substr(2);
    let value = params[1];
    config[key] = value;
    if(key === 'DIR') {
        isDir = true;
    }
});

if(isDir === false) {
    console.log('Param --DIR is required');
    return;
}
console.log(config);

const checkConfig = (dir,file) => {
    let stat = fs.statSync(dir + dirDelimetr + file);
    if(config.PATTERN) {
       if(!Array.isArray(file.match(config.PATTERN))) {
           return false;
       }
    }
    if(!stat.isDirectory()) {
        if(config['MIN-SIZE']) {
            let size = config['MIN-SIZE'].substr(-1,1);
            let length = config['MIN-SIZE'].substring(0, config['MIN-SIZE'].length - 1);

            if(length > stat.size / getDevider(size)) {
                return false;
            }
        }
        if(config['MAX-SIZE']) {
            let size = config['MAX-SIZE'].substr(-1,1);
            let length = config['MAX-SIZE'].substring(0, config['MAX-SIZE'].length - 1);

            if(length < stat.size / getDevider(size)) {
                return false;
            }
        }
    }
    return true;
}
const getDevider = size => {
    switch(size) {
        case "K" : return 1000;break;
        case "M" : return 1000000;break;
        case "G" : return 1000000000;break;
    }
    return 1;
}
const is_dir = (dir,file) => {
    try {
        return fs.statSync(dir + dirDelimetr + file).isDirectory();
    } catch(e) {
        return false;
    }
}
const investigateDir = dirName => {
    fs.readdir(dirName,(err,files) => {
        if (err) throw err;
        files.filter(file => {
            if(is_dir(dirName,file)) {
                if(config.TYPE === "D" && checkConfig(dirName,file))
                    console.log(dirName + dirDelimetr + file);
            } else if(config.TYPE === undefined || config.TYPE  === "F") {
                if(checkConfig(dirName,file)) {
                    console.log(dirName + dirDelimetr + file);
                }
            }
        });
        files.filter(file => {
            if(is_dir(dirName,file)) {
                investigateDir(dirName + dirDelimetr + file);
            }
        })
        return;
    })
}
investigateDir(config.DIR);
