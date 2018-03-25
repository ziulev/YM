const electron       = require('electron')
const Config         = require('electron-config')
const path           = require('path')
const url            = require('url')
const menu           = require('./app/js/menu')
const window         = require('./app/js/window')
const config         = new Config()
const app            = electron.app
const BrowserWindow  = electron.BrowserWindow
const globalShortcut = electron.globalShortcut

let mainWindow

const createWindow = () => {
  mainWindow = new BrowserWindow(config.get('windowBounds') || {width: 800, height: 600})

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, '/app/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  menu.init()
  window.init(mainWindow)

  globalShortcut.register('MediaNextTrack', () => {
    window.next()
  })

  globalShortcut.register('MediaPreviousTrack', () => {
    window.prev()
  })

  globalShortcut.register('MediaStop', () => {
    window.stop()
  })

  globalShortcut.register('MediaPlayPause', () => {
    window.togglePause()
  })

  // Open the devtools
  // mainWindow.webContents.openDevTools()

  // Save window size and position.
  mainWindow.on('close', function () {
    config.set('windowBounds', mainWindow.getBounds())
  })

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}


app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})
