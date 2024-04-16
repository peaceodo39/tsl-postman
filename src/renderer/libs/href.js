class href {
  constructor () {
    this.a = document.createElement('a')
  }

  set (name, value) {
    return this.a[name] = value

  }

  get (name) {
    return this.a[name]
  }

  get_protocol () {
    return this.a.protocol.replace(':', '')
  }

  get_query () {
    return this.a.search
  }

  get_params () {
    return (function () {
      var ret = {}
      var seg = this.a.search.replace(/^\?/, '').split('&').filter(function (v) {
        if (v !== '' && v.indexOf('=')) {
          return true
        }
      })
      seg.forEach(function (element) {
        var idx = element.indexOf('=')
        var key = element.substring(0, idx)
        var val = element.substring(idx + 1)
        ret[key] = val
      })
      return ret
    })()
  }
}

export default href
