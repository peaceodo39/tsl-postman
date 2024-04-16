import _ from 'lodash'

const validator = {
  getMessage (field) {
    return field + '字段不能为这个值(保留字)!'
  },
  validate (value) {
    console.log('验证', arguments)
    let no = [
      'list',
      'api',
      'lists',
      'group'
    ]
    if (_.indexOf(no, value)) {
      return false
    }
    return true
  }
}

export default validator
