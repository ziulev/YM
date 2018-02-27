const electron = require('electron')

const app = electron.app

const BrowserWindow = electron.BrowserWindow
const globalShortcut = electron.globalShortcut;

const path = require('path')
const url = require('url')

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({width: 800, height: 600})

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  globalShortcut.register('MediaNextTrack', () => {
    mainWindow.webContents.send('media-next-track')
  })
  
  globalShortcut.register('MediaPreviousTrack', () => {
    mainWindow.webContents.send('media-prev-track')
  })

  globalShortcut.register('MediaStop', () => {
    mainWindow.webContents.send('media-stop')
  })

  globalShortcut.register('MediaPlayPause', () => {
    mainWindow.webContents.send('media-play-pause')
  })

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

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

