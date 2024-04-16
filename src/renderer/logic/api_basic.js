import lists from "./lists";
import tool from "../libs/tool";
class api_basic {
    constructor(dir, ename) {
        this.dir = dir
        this.ename = ename;
    }

    read(callback) {
        console.log('api_basic', this.dir);
        let listsob = new lists(this.dir);
        listsob.read((data) => {
            let list15 = data;
            let form = list15.api[this.ename];
            callback(form);

        })

    }

    save(data, callback) {
        if(typeof data['uniqid'] ==='undefined'){
            data['uniqid'] =tool.uniqid()
        }

        let listsob = new lists(this.dir);
        listsob.read((res) => {
            let list15 = res;
            list15.api[this.ename] = data;
            listsob.savefile(list15, callback)
        });


    }


}

export default api_basic
