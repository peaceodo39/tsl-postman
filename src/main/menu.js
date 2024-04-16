const electron = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const Menu = electron.Menu


/**
 * 注册键盘快捷键
 * 其中：label: '切换开发者工具',这个可以在发布时注释掉
 */
let template = [
    {
        label: 'Action ( 操作 )',
        submenu: [{
            label: 'relaunch ( 重新启动 )',
            // accelerator: 'CmdOrCtrl+V',
            click: function (){
                app.relaunch();
                app.exit();
            }
        },{
            label: 'Reload ( 重新加载 )',
            accelerator: 'CmdOrCtrl+R',
            click: function (item, focusedWindow) {
                if (focusedWindow) {
                    // on reload, start fresh and close any old
                    // open secondary windows
                    if (focusedWindow.id === 1) {
                        BrowserWindow.getAllWindows().forEach(function (win) {
                            if (win.id > 1) {
                                win.close()
                            }
                        })
                    }
                    focusedWindow.reload()
                }
            }
        }]
    },
    {
        label: 'Window ( 窗口 )',
        role: 'window',
        submenu: [{
            label: 'Minimize ( 最小化 )',
            accelerator: 'CmdOrCtrl+M',
            role: 'minimize'
        },  {
            label: 'Close ( 关闭 )',
            accelerator: 'CmdOrCtrl+W',
            role: 'close'
        }, {
            label: '切换开发者工具',
            accelerator: (function () {
                if (process.platform === 'darwin') {
                    return 'Alt+Command+I'
                } else {
                    return 'Ctrl+Shift+I'
                }
            })(),
            click: function (item, focusedWindow) {
                if (focusedWindow) {
                    focusedWindow.toggleDevTools()
                }
            }
        }, {
            type: 'separator'
        }]
    },
    {
        label: 'Help ( 帮助 ) ',
        role: 'help',
        submenu: [{
            label: '意见反馈 ( Gitee 推荐 )',
            click: function () {
                electron.shell.openExternal('https://gitee.com/tsl-postman/tsl-postman/issues')
            }
        },
        {
            label: '意见反馈 ( Github )',
            click: function () {
                electron.shell.openExternal('https://github.com/api-tsl-postman/tsl-postman/issues')
            }
        },{
            label: '关于',
            click: function () {
               // .window.location.hash="/about"
                BrowserWindow.getAllWindows()[0].webContents.send('router.about');


            }
        },{
                label: '设置',
                click: function () {
                    // .window.location.hash="/about"
                    BrowserWindow.getAllWindows()[0].webContents.send('router.setting');


                }
            }]
    }
]


// 针对Mac端的一些配置
if (process.platform === 'darwin') {
    const name = electron.app.getName()
    template.unshift({
        label: name,
        submenu: [{
            label: 'Quit ( 退出 )',
            accelerator: 'Command+Q',
            click: function () {
                app.quit()
            }
        }]
    })

    // Window menu.
    template[3].submenu.push({
        type: 'separator'
    }, {
        label: 'Bring All to Front',
        role: 'front'
    })

}

export default Menu.buildFromTemplate(template)
