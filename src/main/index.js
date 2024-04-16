'use strict'

import {app, BrowserWindow, Menu, ipcMain} from 'electron'

import menu from './menu';
import config from "../renderer/config";

let awakeUrlInfo = { // 唤起应用的url信息
    urlStr: '',
    urlSearch: '',
    source: {}
}

const PROTOCOL = 'tsl-postman' // 协议名

app.setAsDefaultProtocolClient(PROTOCOL);
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
    global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}
global.__userDataPath = app.getPath('userData');


const development = process.env.NODE_ENV === 'development';
let mainWindow
const winURL = development ? `http://localhost:9080` : `file://${__dirname}/index.html`
const userAgent = "tsl-postman/" + config.version;
const winWidth = development ? 1800 : 1300;

function createWindow() {
    /**
     * Initial window options
     */
    mainWindow = new BrowserWindow({
        height: 1000,
        useContentSize: true,
        width: winWidth,
        userAgent: userAgent,
        webPreferences: {
            webSecurity: process.env.NODE_ENV !== 'development',
            nodeIntegration: true
            // 是否集成 Nodejs,把之前预加载的js去了，发现也可以运行
        }
    })

    mainWindow.loadURL(winURL)
    if (development){
        mainWindow.webContents.openDevTools()
    }

    mainWindow.webContents.userAgent =userAgent;
    mainWindow.on('closed', () => {
        mainWindow = null
    })
    if (process.env.NODE_ENV === 'development') {
        if(process.env.VUE_DEVTOOL_DIR){
            BrowserWindow.addDevToolsExtension(process.env.VUE_DEVTOOL_DIR);
        }
    }

    //"/mnt/d/www/front_end/vue-devtools-4.1.5/shells/chrome"
}

app.on('ready', () => {
    Menu.setApplicationMenu(menu) // 设置菜单部分
    createWindow();
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})


app.on('browser-window-created', function () {
    let reopenMenuItem = findReopenMenuItem()
    if (reopenMenuItem) reopenMenuItem.enabled = false
})

app.on('window-all-closed', function () {
    let reopenMenuItem = findReopenMenuItem()
    if (reopenMenuItem) reopenMenuItem.enabled = true
    app.quit()
})

const OPENVIEW = 'open-view' // 与渲染进程通讯事件名
// 如果唤起的时候，没有其他实例，则以当前实例作为主实例，处理唤起url中的参数
// 对当前启动url进行解析处理
function handleUrl(awakeUrlStr) {
    const {search} = new URL(awakeUrlStr)

    awakeUrlInfo.urlStr = awakeUrlStr;
    awakeUrlInfo.urlSearch =  search && search.slice(1);
}

// 对当前启动参数进行判断处理（app.isPackaged用来区分开发阶段及包阶段）
function handleArgv(argv) {
    const offset = app.isPackaged ? 1 : 2
    const url = argv.find((arg, i) => i >= offset && arg.startsWith(PROTOCOL))
    awakeUrlInfo.source = argv
    if (url) {
        handleUrl(url)
    }
}


handleArgv(process.argv)


if (app.requestSingleInstanceLock()) { // 判断是否自由一个实例
  app.on('second-instance', (event, argv) => {
    if (process.platform === 'win32') {
      handleArgv(argv)
    }
    let allWin = BrowserWindow.getAllWindows()
    allWin.map(win => {
      win.show()
        win.webContents.send(OPENVIEW, awakeUrlInfo)
    })

  })

} else { // 关闭当前新创建的实例
  app.quit()
}





app.on('open-url', (event, urlStr) => {
    handleUrl(urlStr)
})


app.on('browser-window-focus', (event, window) => {
    window.webContents.send('focus')
})





// 主进程通讯监听渲染进程派发的 OPENVIEW 事件
ipcMain.on(OPENVIEW, (event) => {
    // 并发送当前唤起应用的数据
    console.log('main open-view');
    event.sender.send(OPENVIEW, awakeUrlInfo)
})

function findReopenMenuItem() {
    const menu = Menu.getApplicationMenu()
    if (!menu) return

    let reopenMenuItem
    menu.items.forEach(function (item) {
        if (item.submenu) {
            item.submenu.items.forEach(function (item) {
                if (item.key === 'reopenMenuItem') {
                    reopenMenuItem = item
                }
            })
        }
    })
    return reopenMenuItem
}
