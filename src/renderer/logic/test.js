// 测试逻辑
import ajax from '../libs/ajax'
import ws from '../libs/ws'
import lodash from 'lodash'

class test {

  constructor (api, group) {
    this.api = lodash.cloneDeep(api)
    this.group = lodash.cloneDeep(group)
    if (this.group.type == 'http' || this.group.type == 'https') {
      this.connect = new ajax(group.type, group.domain, group.port)
    } else {
      this.connect = new ws(group.type, group.domain, group.port)
    }
  }

  send (senddata, callbak,callbak2) {
    this.connect.send(this.api.request_type, this.api.url, senddata, callbak,callbak2)
  }

  close () {
    this.connect.close()
  }

  wsrecon(){
    this.connect.close()
  }
}

export default test
