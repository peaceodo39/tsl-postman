import axios from 'axios'
import qs from 'qs'
class ajax {
  constructor (protocol, hostname, port) {
    let url2 = protocol + '://' + hostname + ':' + port
    console.log('constructor', url2)
    this.axios = axios.create({
      baseURL: url2
    })
  }

  send (type, url, senddata, callbak,callbak2) {
    console.log('12', arguments)
    url = senddata.url;
    if (type == 'get') {
      return this.get_send(url, senddata, callbak,callbak2)
    }
    if (type == 'post') {
      return this.post_send(url, senddata, callbak,callbak2)
    }
    if (type == 'view') {
      return this.get_send(url, senddata, callbak,callbak2)
    }
    if (type == 'image') {
      return this.get_send(url, senddata, callbak,callbak2)
    }

    if (type == 'put') {
      return this.put_send(url, senddata, callbak,callbak2)
    }

    if (type == 'delete') {
      return this.delete_send(url, senddata, callbak,callbak2)
    }

    if(type == 'patch'){
      return this.patch_send(url, senddata, callbak,callbak2);
    }
  }

  get_send (url, senddata, callbak,callbak2) {
    this.axios.request({
      url: url,
      params: senddata.get,
      headers: senddata.headers
    }).then(callbak).catch(callbak2)
  }

  post_send (url, senddata, callbak,callbak2) {
    console.log('post_send', senddata)
    let headers = senddata.headers;
    // headers['Content-Type']= 'application/x-www-form-urlencoded';
    this.axios.post(url, qs.stringify(senddata.form), {
      params: senddata.get,
      headers: headers
    }).then(callbak).catch(callbak2)
  }

  put_send (url, senddata, callbak,callbak2) {
    console.log('put_send', arguments)
    this.axios.put(url, qs.stringify(senddata.form), {
      params: senddata.get,
      headers: senddata.headers
    }).then(callbak).catch(callbak2)
  }

  patch_send (url, senddata, callbak,callbak2) {
    console.log('patch_send', arguments)
    this.axios.patch(url, qs.stringify(senddata.form), {
      params: senddata.get,
      headers: senddata.headers
    }).then(callbak).catch(callbak2)
  }

  delete_send (url, senddata, callbak,callbak2) {
    console.log('delete_send', arguments)
    this.axios.delete(url, 
      {
      params: senddata.get,
      headers: senddata.headers
    }).then(callbak).catch(callbak2,callbak2)
  }

}

export default ajax
