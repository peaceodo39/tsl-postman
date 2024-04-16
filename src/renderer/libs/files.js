import jsonFormat from "json-format";

const fs = require('fs')
import path from 'path'

export default {
  rmdirSync (path1) {
    let files = []
    console.debug(path1,fs.existsSync(path1))
    if (fs.existsSync(path1)) {
      files = fs.readdirSync(path1);
      files.forEach((file) => {
        let curPath = path.join(path1,file)
        if (fs.statSync(curPath).isDirectory()) {
          this.rmdirSync(curPath) //递归删除文件夹
        } else {
          fs.unlinkSync(curPath) //删除文件
        }
      })
      fs.rmdirSync(path1)
    }else{
      throw "文件不存在"+path1;
    }


  },
  rmdir (path1) {
    let files = []
    if (fs.existsSync(path)) {
      files = fs.readdirSync(path)
      files.forEach((file) => {
        let curPath = path.join(path1,file)
        if (fs.statSync(curPath).isDirectory()) {
          this.delDir(curPath) //递归删除文件夹
        } else {
          fs.unlinkSync(curPath) //删除文件
        }
      })
      fs.rmdirSync(path1)
    }

  },
  /**
   * 复制文件夹
   * @param {*} path 
   * @param {*} topath 
   */
  copydirSync(path1,topath)
  {
    console.log(path1,topath)
    if(!fs.existsSync(topath)){
      fs.mkdirSync(topath,{recursive: true});
    }
   let  files = fs.readdirSync(path1)
    files.forEach((file) => {
      let curPath = path.join(path1,file);
      if (fs.statSync(curPath).isDirectory()) {
        this.copydirSync(curPath,path.join(topath,file)) //递归复制文件夹
      } else {
        fs.copyFileSync(curPath,path.join(topath,file)) //复制文件
      }
    })
    // fs.copyFileSync(src, dest);
  },

  read (pathjson, default_data, callback) {

    fs.access(pathjson, fs.constants.F_OK, (err) => {
      if (err) {
        this.create(pathjson, jsonFormat(default_data), callback)
      } else {
        this.read2(pathjson, callback)
      }

    })
  },
  save(pathjson, data, callback){
    this.create(pathjson, data, callback);
  },
  create (pathjson, data, callback) {
    console.log(arguments)
    if(typeof  data !=='string'){
      data = jsonFormat(data)
    }
    fs.writeFile(pathjson, data, {
      encoding: 'utf8',
      flag: 'w+'
    }, (err) => {

      if (err) {
        //不存在的文件夹
        // 创建文件夹
        fs.mkdir(path.dirname(pathjson), {recursive: true},
            (err)=>{
              console.log('mkdir_callback61',err);
              this.create(pathjson, data, callback);

            })
      } else {
        this.read2(pathjson, callback)
      }
    })
  },

  read2 (pathjson, callback) {

    fs.readFile(pathjson, {
      encoding: 'utf8'
    }, (err, data1) => {
      if (err) {
        throw err
      }
      console.log(data1)
      if( pathjson.substr(-4)=='json'){
        callback(JSON.parse(data1))
      }else{
        callback(data1)
      }

    })
  }

}
