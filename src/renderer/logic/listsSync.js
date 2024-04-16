import fs from 'fs'
import path from 'path'
import jsonFormat from 'json-format'
import store from '@/store'
import _ from 'lodash'


class listsSync {
    constructor(dir) {
        this.dir = dir
        this.obj_data = {
            group: {},
            api: {},
            test: {},
            biaoshi: [],
            dir: this.dir
        }
        this.all = {}
        this.path = path.join(store.getters.now_open.toString(), this.dir, 'list.json')

    }

    read() {
        try {
            fs.accessSync(this.path, fs.constants.F_OK);
            return this.read2()
        } catch (err) {
            return this.createandsave()
        }

    }

    createandsave() {
        let dir = path.dirname(this.path);
        try {
            fs.accessSync(dir, fs.constants.F_OK);

        } catch (e) {
            console.log('mkdir', dir);
            fs.mkdirSync(dir, {recursive: true})
        }

        fs.writeFileSync(this.path, jsonFormat(this.obj_data), {
            encoding: 'utf8',
            flag: 'w+'
        });
        return this.obj_data;

    }

    savefile(data) {
        this.obj_data = data
        this.createandsave()
    }

    read2() {
        let data1 = fs.readFileSync(this.path, {
            encoding: 'utf8'
        });
        try {
            this.obj_data = JSON.parse(data1)
        } catch (e) {
            throw this.path + ",文件内容不是json串" + data1
        }
        let biaoshi = []
        console.log('path', this.obj_data.api)

        _.forIn(this.obj_data.api, (b) => {
            biaoshi.push(b.e_name)
        })

        _.forIn(this.obj_data.group, (b) => {
            biaoshi.push(b.e_name)
        })

        this.obj_data.biaoshi = _.uniq(biaoshi)
        console.log('这是列表的内容:', this.obj_data)
        return this.obj_data;
    }

    add_group(data) {
        console.log('data', data)
        this.obj_data.group[data.e_name] = _.clone(data)
        return this.create()

    }

    add_api(data) {
        this.obj_data.api[data.e_name] = _.clone(data)
        return this.savefile(this.obj_data)
    }

    add_test(data) {
        this.obj_data.test[data.e_name] = _.clone(data)
        return this.create()
    }

    /**
     * 删除分组
     * @param e_name
     * @param callback
     */
    remove_group(e_name) {
        //删除分组
        //修改列表文件
        return this.remove1(e_name, 'group')
    }

    /**
     * 删除API
     * @param e_name
     * @param callback
     */
    remove_api(e_name) {
        //修改列表文件
        return this.remove1(e_name, 'api')
    }

    /**
     * 删除API
     * @param e_name
     * @param callback
     */
    remove_softapi(e_name) {
        //修改列表文件
        _.unset(this.obj_data, ['api', e_name])
        let index = path.join(store.getters.now_open.toString(), this.dir, e_name)
        console.log('remove', this.obj_data, index)

        //修改
        return this.savefile(this.obj_data)
    }

    /**
     * 删除Test
     * @param e_name
     * @param callback
     */
    remove_test(e_name) {
        //修改列表文件
        return this.remove1(e_name, 'test')
    }

    /**
     * 删除操作
     * @param e_name
     * @param type
     * @param callback
     */
    remove1(e_name, type) {
        //修改列表文件
        _.unset(this.obj_data, [type, e_name])
        let index = path.join(store.getters.now_open.toString(), this.dir, e_name)
        console.log('remove', this.obj_data, index)

        //修改
        return this.savefile(this.obj_data)
    }


}

export default listsSync
