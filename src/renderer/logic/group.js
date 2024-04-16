import fs from 'fs'
import path from 'path'
import jsonFormat from 'json-format'
import store from '@/store'
import lodash from 'lodash'

class group {
  constructor (dir) {
    this.dir = dir
    this.obj_data = {}
    this.path = path.join(store.getters.now_open.toString(), this.dir)
  }

  read (type, default_data, callback) {
    if (type == 'list') {
      return false
    }
    let pathjson = path.join(this.path, type + '.json')
    fs.access(pathjson, fs.constants.F_OK, (err) => {
      if (err) {
        this.create(pathjson, jsonFormat(default_data), callback)
      } else {
        this.read2(pathjson, callback)
      }

    })
  }

  readp (type, ddata, callback) {
    this.readp2(type, ddata, '..', callback)
  }

  readp2 (type, ddata, pathp, callback) {

    let path2 = path.join(store.getters.now_open.toString(), this.dir, pathp)
    let pathjson = path.join(path2, type + '.json')

    if (path2 == store.getters.now_open.toString() || path.join(this.dir, pathp) == '.' || path.join(this.dir, pathp) == '..') {
      // 根目录了
      callback(ddata)
    }
    fs.access(pathjson, fs.constants.F_OK, (err) => {
      if (err) {
        this.readp2(type, ddata, pathp + '/../', callback)

      } else {
        this.read2(pathjson, (data) => {
          if (lodash.isEmpty(data)) {
            this.readp2(type, ddata, pathp + '/../', callback)
          } else {
            callback(data)
          }
        })
      }

    })

  }

  save (type, data, callback) {
    let pathjson = path.join(this.path, type + '.json')

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
      callback(JSON.parse(data1))
    })
  }

}

export default group
