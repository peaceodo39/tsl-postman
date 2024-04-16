class ws {

  constructor (protocol, hostname, port) {
    console.log('init ws :', arguments)
    this.url2 = protocol + '://' + hostname + ':' + port
    this.name2 = protocol + hostname + port
    this.conn = this.get_new()

  }

  send (type, url, senddata, callbak) {
    console.log(this.conn)
    if (this.conn.readyState != '1') {
      this.conn = this.get_new(true)
      this.conn.onopen = () => {
        this.send(type, url, senddata, callbak)
      }
      return 1
    }

    this.conn.onmessage = function (evt) {
      var received_msg = evt.data
      callbak(received_msg)
    }
    this.conn.send(senddata)
  }

  get_new (re = false) {
    if (typeof window.wsconn == 'undefined') {

      window.wsconn = {}
    }
    console.log('wsconn', window.wsconn)

    if (typeof window.wsconn[this.name2] == 'undefined' || re) {
      console.log('wsconn2', typeof (window.wsconn))
      window.wsconn[this.name2] = new WebSocket(this.url2)
    }
    return window.wsconn[this.name2]
  }

  close () {
    console.log('close')
    this.conn.close()
  }

}

export default ws
