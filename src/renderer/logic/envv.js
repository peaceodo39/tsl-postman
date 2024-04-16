import fs from 'fs'
import path from 'path'
import jsonFormat from 'json-format'
import store from '@/store'

/**
 *  环境便令的处理
 */
class envv {
  constructor () {
    this.obj_data = {}
    this.path = path.join(store.getters.now_open.toString())
  }

  read ( callback) {
    let  default_data= {
      'default': []
    };
    let pathjson = path.join(this.path,   'env.json')
    fs.access(pathjson, fs.constants.F_OK, (err) => {
      if (err) {
        this.create(pathjson, jsonFormat(default_data), callback)
      } else {
        this.read2(pathjson, callback)
      }

    })
  }

  save ( data, callback) {
    let pathjson = path.join(this.path, 'env.json')

    this.create(pathjson, jsonFormat(data), callback)
  }
 
  create (pathjson, data, callback) {
    console.log(arguments)
    fs.writeFile(pathjson, data, {
      encoding: 'utf8',
      flag: 'w+'
    }, (err) => {

      if (err) {
        //不存在的文件夹
        // 创建文件夹
        fs.mkdir(path.dirname(pathjson), {recursive: true},
          this.create(pathjson, data, callback))
      } else {
        this.read2(pathjson, callback)
      }
    })
  }

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

export default envv
