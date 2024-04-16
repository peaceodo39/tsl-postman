import lists from "../logic/lists";
import {clipboard} from 'electron';
export default {
    watch: {
        apiid() {
            this.init()
        }
    },
    methods: {
        refresh() {
            this.refresh_list();
            this.init();
        },
        share(apidata) {
            let now_object = this.$store.state.now_object;
            if(typeof  apidata.uniqid ==='undefined'){
                return this.$Message.error("这个API缺少唯一标识符,请编辑API后再次尝试.")
            }
            if(typeof  now_object.e_name ==='undefined'){
                return this.$Message.error("这个项目数据格式错误，请拉去最新项目数据重试.")
            }
            let code = 'tsl-postman://'+now_object.e_name+'.'+apidata.uniqid;

            this.$Modal.confirm({
                title: '分享API:' + apidata.name,
                content: code,
                okText:"复制",
                cancelText:"关闭",
                onOk: () => {
                    clipboard.writeText(code);
                    this.$Message.success("分享码已经复制到剪切板.")

                },
                onCancel: () => {

                }
            });
        },
        shareurl(apidata){
            let now_object = this.$store.state.now_object;
            if(typeof  apidata.uniqid ==='undefined'){
                return this.$Message.error("这个API缺少唯一标识符,请编辑API后再次尝试.")
            }
            if(typeof  now_object.e_name ==='undefined'){
                return this.$Message.error("这个项目数据格式错误，请拉去最新项目数据重试.")
            }
            // let code = 'tsl-postman://'+now_object.e_name+'.'+apidata.uniqid;
            let url = 'http://localhost:63342/tsl-postman/share.html?ename='+now_object.e_name+'&unquid='+apidata.uniqid;
            this.$Modal.confirm({
                title: '分享API:' + apidata.name,
                content: url,
                okText:"复制",
                cancelText:"关闭",
                onOk: () => {
                    clipboard.writeText(url);
                    this.$Message.success("分享码已经复制到剪切板.")

                },
                onCancel: () => {

                }
            });
        },
        deletee() {
            // 判断是否有引用
            for (let li in this.$store.state.api_list) {
                let api = this.object_copy(this.$store.state.api_list[li]);
                if (typeof api.soft_link === 'boolean' && api.soft_link) {
                    if (api.soft_link_id === this.dd1.uniqid) {
                        console.log("不可删除");
                        this.$Message.error('存在软连接,不能删除!')
                        return;
                    }
                }
            }

            // eslint-disable-next-line no-unreachable
            console.log('删除')
            let listb = new lists(this.dd1.dir)
            listb.read((data) => {
                console.log('data', data)
                listb.remove_api(this.dd1.e_name, () => {
                    this.$Message.success('删除成功!')
                    this.$router.push('/open/')
                })
            })

        },
        deletee_link() {
            console.log('删除软连接', this.dd_softlink)
            let listb = new lists(this.dd_softlink.dir)
            listb.read((data) => {
                console.log('data', data)
                listb.remove_softapi(this.dd_softlink.e_name, () => {
                    this.$Message.success('删除软连接成功!')
                    this.$router.push('/open/')
                })
            })
        },
    },

}