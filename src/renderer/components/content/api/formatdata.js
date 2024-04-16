export default {
  boolean: `布尔类型
    <pre>Random.boolean( min?, max?, current? )</pre>
    参考: https://github.com/nuysoft/Mock/wiki/Basic
    `,
  natural: `随机的自然数（大于等于 0 的整数）
    <pre>Random.natural( min?, max? )</pre>
    参考: https://github.com/nuysoft/Mock/wiki/Basic`,
  integer: `随机的整数
   <pre>Random.integer( min?, max? )</pre>
  参考: https://github.com/nuysoft/Mock/wiki/Basic`,
  float: `随机的浮点数
  <pre>Random.float( min?, max?, dmin?, dmax? )</pre>
  参考: https://github.com/nuysoft/Mock/wiki/Basic`,
  character: `随机字符
    <pre>Random.character( pool? )</pre>
    <pre lang="json">{    lower: "abcdefghijklmnopqrstuvwxyz",
    upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    number: "0123456789",
    symbol: "!@#$%^&*()[]" }</pre>
  参考: https://github.com/nuysoft/Mock/wiki/Basic`,
  string: `随机字符串,参考: https://github.com/nuysoft/Mock/wiki/Basic`,
  range: `整型数组,参考: https://github.com/nuysoft/Mock/wiki/Basic`,
  date: `随机的日期字符串,参考: https://github.com/nuysoft/Mock/wiki/Date`,
  time: `随机的时间字符串,参考: https://github.com/nuysoft/Mock/wiki/Date`,
  datetime: `随机的日期和时间字符串,参考: https://github.com/nuysoft/Mock/wiki/Date`,
  now: `当前的日期和时间字符串,参考: https://github.com/nuysoft/Mock/wiki/Date`,
  image: `一个随机的图片地址,参考: https://github.com/nuysoft/Mock/wiki/Image`,
  dataImage: `随机的 Base64 图片编码,参考: https://github.com/nuysoft/Mock/wiki/Image`,
  color: `随即颜色格式为 #RRGGBB,参考:https://github.com/nuysoft/Mock/wiki/Color`,
  hex: `随即颜色格式为 #RRGGBB,参考:https://github.com/nuysoft/Mock/wiki/Color`,
  rgb: `随即颜色格式为 #RRGGBB,参考:https://github.com/nuysoft/Mock/wiki/Color`,
  rgba: `随即颜色格式为 #rgba(r, g, b,a),参考:https://github.com/nuysoft/Mock/wiki/Color`,
  hsl: `随即颜色格式为 #hsl(r, g, b),参考:https://github.com/nuysoft/Mock/wiki/Color`,
  paragraph: `一段文本,参考:https://github.com/nuysoft/Mock/wiki/Text`,
  cparagraph: `一段中文文本,参考:https://github.com/nuysoft/Mock/wiki/Text`,
  sentence: `一个句子,参考:https://github.com/nuysoft/Mock/wiki/Text`,
  csentence: `一个中文句子,参考:https://github.com/nuysoft/Mock/wiki/Text`,
  word: `一个单词,参考:https://github.com/nuysoft/Mock/wiki/Text`,
  cword: `一个中文汉字,参考:https://github.com/nuysoft/Mock/wiki/Text`,
  title: `一句标题,参考:https://github.com/nuysoft/Mock/wiki/Text`,
  ctitle: `一个中文标题,参考:https://github.com/nuysoft/Mock/wiki/Text`,
  guid: `随机生成一个 GUID,参考:https://github.com/nuysoft/Mock/wiki/Miscellaneous`,
  id: `身份在,参考:https://github.com/nuysoft/Mock/wiki/Miscellaneous`,
  increment: `全局自增整数 ,参考:https://github.com/nuysoft/Mock/wiki/Miscellaneous`,
  capitalize: `字符串的第一个字母转换为大写,参考:https://github.com/nuysoft/Mock/wiki/Helper`,
  upper: `字符串转换为大写,参考:https://github.com/nuysoft/Mock/wiki/Helper`,
  lower: `转换小写,参考:https://github.com/nuysoft/Mock/wiki/Helper`,
  pick: `数组中随机选取一个元素,参考:https://github.com/nuysoft/Mock/wiki/Helper`,
  shuffle: `打算数组顺序,参考:https://github.com/nuysoft/Mock/wiki/Helper`,
  region: `随即一个中国的大区,参考:https://github.com/nuysoft/Mock/wiki/Address`,
  province: `随即一个中国的省份,参考:https://github.com/nuysoft/Mock/wiki/Address`,
  city: `随即一个中国的城市,参考:https://github.com/nuysoft/Mock/wiki/Address`,
  county: `随即一个中国的县区,参考:https://github.com/nuysoft/Mock/wiki/Address`,
  zip: `随即一个中国的邮政编码,参考:https://github.com/nuysoft/Mock/wiki/Address`,
  url: `生成一个URl,参考:https://github.com/nuysoft/Mock/wiki/Web`,
  protocol: `生成一个URl协议,参考:https://github.com/nuysoft/Mock/wiki/Web`,
  domain: `生成一个域名,参考:https://github.com/nuysoft/Mock/wiki/Web`,
  tld: `生成一个顶级域名后缀,参考:https://github.com/nuysoft/Mock/wiki/Web`,
  email: `生成一个邮箱,参考:https://github.com/nuysoft/Mock/wiki/Web`,
  ip: `生成一个IP地址,参考:https://github.com/nuysoft/Mock/wiki/Web`,
  first: `一个常见的英文名,参考: https://github.com/nuysoft/Mock/wiki/Name`,
  last: `一个常见的英文姓氏,参考: https://github.com/nuysoft/Mock/wiki/Name`,
  name: `一个常见的英文全名,参考: https://github.com/nuysoft/Mock/wiki/Name`,
  cfirst: `一个常见的中文名,参考: https://github.com/nuysoft/Mock/wiki/Name`,
  clast: `一个常见的中文姓氏,参考: https://github.com/nuysoft/Mock/wiki/Name`,
  cname: `一个常见的中文全名,参考: https://github.com/nuysoft/Mock/wiki/Name`
}
