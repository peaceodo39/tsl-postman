import listsSync from "./listsSync";
import tool from "../libs/tool";

/**
 * 同步处理版本的
 */
class apibasic {
    constructor(dir, ename) {
        this.dir = dir
        this.ename = ename;
    }

    read() {
        console.log('api_basic', this.dir);
        let listsob = new listsSync(this.dir);
        let data = listsob.read()
        let list15 = data;
        let form = list15.api[this.ename];
        return form;
    }

    save(data) {
        if (typeof data['uniqid'] === 'undefined') {
            data['uniqid'] = tool.uniqid()
        }

        let listsob = new listsSync(this.dir);
        let res = listsob.read();
        let list15 = res;
        list15.api[this.ename] = data;
        return listsob.savefile(list15)
    }


}

export default apibasic
