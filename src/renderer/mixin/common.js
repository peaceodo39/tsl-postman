import lodash from 'lodash';
import process from "process";
import electron from "electron";
import moment from 'moment';
import jsonFormat from 'json-format';

export default {
    computed: {
        isPackaged() {
            return !process.env.WEBPACK_DEV_SERVER;
        },
        list_height() {
            let h94 = 64 + 32 + 21 + 49 + 55 + 24 + 24 + 24;
            let h12 = 24;
            // ivu-layout-header 64 +
            // ivu-breadcrumb 21+16+16(高+外框)
            // ivu-layout-footer 49
            // ivu-layout-content pading 24*2
            // list 按钮 55
            console.log(h94, h12);
            return (document.body.clientHeight - h94).toString() + 'px';
        },
        content_height() {
            let h94 = 64 + 32 + 21 + 49 + 24 + 24 + 24;
            let h12 = 24;
            // ivu-layout-header 64 +
            // ivu-breadcrumb 21+16+16(高+外框)
            // ivu-layout-footer 49
            // ivu-layout-content pading 24*2
            // list 按钮 55

            let c= (document.body.clientHeight - h94).toString() + 'px';
            console.log('content_height', h94,h12,c);
            return c;
        }
    },
    filters: {
        ns2date(nS) {
            return new Date(parseInt(nS) * 1000);
        },
        moment(ns, Format = "YYYY-MM-DD HH:mm:ss") {
            return moment(ns * 1000).format(Format);
        },
        jsonFormat(data) {
            return jsonFormat(data);
        }
    },
    methods: {
        gohome(){
            console.log('gohome');
            this.$router.push('/');
            setTimeout(()=>{
                window.location.reload();
            },200);
        },
        openurl(url) {
            electron.shell.openExternal(url);
        },
        object_copy(a) {
            return JSON.parse(JSON.stringify(a));
        },
        /**
         * 应用环境变量数据
         * @param data
         */
        apply_env(data) {

            let jsonstring = JSON.stringify(data);
            console.log("应用环境变量前", jsonstring);
            this.now_env = this.envlist[this.$store.state.envselect];
            for (let envob of this.now_env) {
                let rep = '{'+ envob.name + '}'
                jsonstring = jsonstring.replace(new RegExp(rep,'g'), envob.value)
            }
            console.log("应用环境变量", jsonstring);
            return JSON.parse(jsonstring);
        },
        empty2(vall) {
            console.log('empty2', vall);
            return lodash.isEmpty(vall);
        },
        position_api() {
            let position_api = document.getElementById("position_api");
            if (typeof position_api == 'object') {
                position_api.click();
            }
        },
        refresh_list() {
            let f5 = document.getElementById("f5");
            if (typeof f5 == 'object') {
                f5.click();
            }
            this.$Message.success("刷新列表完成!");

        }
    },

}