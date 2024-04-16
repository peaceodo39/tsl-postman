/**
 * This file is used specifically and only for development. It installs
 * `electron-debug` & `vue-devtools`. There shouldn't be any need to
 *  modify this file, but it can be used to extend your development
 *  environment.
 */

/* eslint-disable */

// Install `electron-debug` with `devtron`
require('electron-debug')({ showDevTools: true })

// Install `vue-devtools`
require('electron').app.on('ready', () => {
    console.log(' install `vue-devtools`');
  let installExtension = require('electron-devtools-installer-cn')
  installExtension.default(installExtension.VUEJS_DEVTOOLS)
    .then(() => {
        console.log(' install `vue-devtools` OK .');
    })
    .catch(err => {
      console.log('Unable to install `vue-devtools`: \n', err)
    })
})

// Require `main` process to boot app
require('./index')
