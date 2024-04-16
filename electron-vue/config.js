const fs = require('fs');
const vue =  require('vue');

let config = {
    build_time: Math.round(new Date().getTime() / 1000),
    version: process.env.npm_package_version,
    base_version: process.env.npm_package_base_version,

    version_dependencies: {
        electron_debug: process.env.npm_package_dependencies_electron_debug,
        vue: vue.version,
        vuex: process.env.npm_package_dependencies_vuex,
        iview: process.env.npm_package_dependencies_iview,
        vue_electron: process.env.npm_package_dependencies_vue_electron,
        electron: process.env.npm_package_devDependencies_electron,
        vuex_electron: process.env.npm_package_dependencies_vuex_electron,
    }
};
let configjspath = 'src/renderer/config.js';
let configjspath2 = fs.existsSync(configjspath);
console.log(configjspath2, "生成新配置文件数据:", config, ";到文件:",
    configjspath);
fs.writeFileSync(configjspath, 'export default ' + JSON.stringify(config));

