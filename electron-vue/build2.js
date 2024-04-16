'use strict'
const fs = require('fs');
const os = require('os');
// const path = require('path');
let tsl-postmanpath, now_tsl-postmanpath;
if (os.type() == 'Linux') {
    console.log(14)
    tsl-postmanpath = './build/tsl-postman.AppImage';
    now_tsl-postmanpath = './build/tsl-postman-' + process.env.npm_package_version + '.AppImage';
    let snappath = './build/tsl-postman.snap';
    let now_snappath = './build/tsl-postman_' + process.env.npm_package_version + '_amd64.snap';
    fs.copyFileSync(now_snappath, snappath);
} else {
    if (os.type() == 'Windows_NT') {
        tsl-postmanpath = './build/tsl-postman.exe';
        now_tsl-postmanpath = './build/tsl-postman-' + process.env.npm_package_version + '.exe';

    } else {
        tsl-postmanpath = './build/tsl-postman.AppImage';
        now_tsl-postmanpath = './build/tsl-postman-' + process.env.npm_package_version + '.AppImage';

    }
}
let tsl-postmanexc = fs.existsSync(tsl-postmanpath);
if (tsl-postmanexc) {
    fs.unlinkSync(tsl-postmanpath);
}


let tsl-postmanexc2 = fs.existsSync(now_tsl-postmanpath);
if (tsl-postmanexc2) {
    fs.copyFileSync(now_tsl-postmanpath, tsl-postmanpath);
    console.log("已经生成新的文件:", tsl-postmanpath, os.type())

}



