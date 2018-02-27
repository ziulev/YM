const electron = require('electron')
const ipc      = electron.ipcRenderer
const embed    = document.querySelector('.view')

ipc.on('media-next-track', () => {
  embed.executeJavaScript(`externalAPI.next()`)
})

ipc.on('media-prev-track', () => {
  embed.executeJavaScript(`externalAPI.prev()`)
})

ipc.on('media-stop', () => {
  embed.executeJavaScript(`externalAPI.stop()`)
})

ipc.on('media-play-pause', () => {
  embed.executeJavaScript(`externalAPI.togglePause()`)
})
