let window

module.exports = {

  init: mainWindow => {
    window = mainWindow
  },

  next: () => {
    window.webContents.send('next')
  },

  prev: () => {
    window.webContents.send('prev')
  },

  stop: () => {
    window.webContents.send('stop')
  },

  togglePause: () => {
    window.webContents.send('toggle-pause')
  }

}