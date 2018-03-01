const electron = require('electron')
const ipc      = electron.ipcRenderer
const webview  = document.querySelector('.view')

webview.addEventListener('dom-ready', () => {
  webview.insertCSS(`
    .layout_narrow .centerblock-wrapper {
      margin-right: 0 !important;
    }

    .bar-below {
      display: none;
    }
  `)
})

ipc.on('media-next-track', () => {
  webview.executeJavaScript(`externalAPI.next()`)
})

ipc.on('media-prev-track', () => {
  webview.executeJavaScript(`externalAPI.prev()`)
})

ipc.on('media-stop', () => {
  webview.executeJavaScript(`externalAPI.stop()`)
})

ipc.on('media-play-pause', () => {
  webview.executeJavaScript(`externalAPI.togglePause()`)
})
