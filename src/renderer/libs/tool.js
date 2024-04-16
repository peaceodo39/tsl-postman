export default {
  getRandomColor () {
    var r = Math.round(Math.random() * 255), g = Math.round(Math.random() * 255), b = Math.round(Math.random() * 255)
    var color = r << 16 | g << 8 | b
    return '#' + color.toString(16)
  },
  uniqid(prefix = null, more_entropy = null) {
    prefix = prefix ? prefix: "" ;
    let retId;
    let formatSeed = function (seed, reqWidth) {
      seed = parseInt(seed, 10).toString(16);
      if (reqWidth < seed.length) return seed.slice(seed.length - reqWidth);
      if (reqWidth > seed.length) return Array(1 + (reqWidth - seed.length)).join('0') + seed;
      return seed;
    };
    if (!this.php_js) this.php_js = {};
    if (!this.php_js.uniqidSeed) this.php_js.uniqidSeed = Math.floor(Math.random() * 0x75bcd15);
    this.php_js.uniqidSeed++;
    retId = prefix;
    retId += formatSeed(parseInt(new Date().getTime() / 1000, 10), 8);
    retId += formatSeed(this.php_js.uniqidSeed, 5);
    if (more_entropy) retId += (Math.random() * 10).toFixed(8).toString();
    return retId;
  },
}
