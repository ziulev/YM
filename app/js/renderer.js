const electron = require('electron')
const ipc      = electron.ipcRenderer
const webview  = document.querySelector('.view')

webview.addEventListener('dom-ready', () => {

  // Open the Yandex.music devtools
  // webview.openDevTools()

  webview.insertCSS(`
    .layout_narrow .centerblock-wrapper {
      margin-right: 0 !important;
    }

    .bar-below {
      display: none;
    }

    .d-overhead {
      display: none !important;
    }
  `)
})

ipc.on('next', () => {
  webview.executeJavaScript(`externalAPI.next()`)
})

ipc.on('prev', () => {
  webview.executeJavaScript(`externalAPI.prev()`)
})

ipc.on('stop', () => {
  webview.executeJavaScript(`externalAPI.stop()`)
})

ipc.on('toggle-pause', () => {
  webview.executeJavaScript(`externalAPI.togglePause()`)
})
