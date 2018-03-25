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
