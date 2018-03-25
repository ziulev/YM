const {app, Menu} = require('electron')
const window      = require('./window')

const menu = [
  {
    label: 'Edit',
    submenu: [
      {role: 'cut'},
      {role: 'copy'},
      {role: 'paste'},
      {role: 'selectall'}
    ]
  },
  {
    label: 'View',
    submenu: [
      {role: 'reload'},
      {role: 'togglefullscreen'}
    ]
  },
  {
    label: 'Controls',
    submenu: [
      {
        label: 'Play / Pause',
        click: () => window.togglePause()
      },
      {
        label: 'Next',
        click: () => window.next()
      },
      {
        label: 'Previous',
        click: () => window.prev()
      }
    ]
  },
  {
    label: 'Window',
    role: 'window',
    submenu: [
        {role: 'minimize'},
        {role: 'close'}
    ]
  }
]

if (process.platform === 'darwin') {
  menu.unshift({
    label: app.getName(),
    submenu: [
      {role: 'about'},
      {type: 'separator'},
      {role: 'hide'},
      {role: 'hideothers'},
      {role: 'unhide'},
      {type: 'separator'},
      {role: 'quit'}
    ]
  })
  menu[3].submenu.push(
    {type: 'separator'},
    {role: 'front'}
  );
}

module.exports = {
  init: function () {
    Menu.setApplicationMenu(Menu.buildFromTemplate(menu))
  }
}
