const NotificationCenter = require('node-notifier').NotificationCenter
const path = require('path')

const TRACK_COVER_SIZE = '50x50'

const notifier = new NotificationCenter({
  withFallback: false,
})

document.addEventListener('DOMSubtreeModified', (event) => {

  const trackTitle = event.target.querySelector('.track__title')

  if (event.target.className === 'player-controls__track-container' && trackTitle && externalAPI.isPlaying()) {

    const currentTrack = externalAPI.getCurrentTrack()
    const currentTrackCover = `http://${currentTrack.cover.split('/').slice(0, -1).concat(TRACK_COVER_SIZE).join('/')}`

    notifier.notify(
      {
        title: 'Yandex.music',
        subtitle: currentTrack.artists[0].title,
        message: currentTrack.title,
        icon: path.join(__dirname, '../icons/mac/icon.icns'), // Absolute Path to Triggering Icon
        contentImage: currentTrackCover, // Absolute Path to Attached Image (Content Image)
        wait: false, // Wait for User Action against Notification or times out. Same as timeout = 5 seconds
        timeout: 5, // Takes precedence over wait if both are defined.
        closeLabel: 'Close', // String. Label for cancel button
        actions: 'Next', // String | Array<String>. Action label or list of labels in case of dropdown,
      },
      (error, response, metadata) => {
        if (metadata.activationValue === 'Next') {
          externalAPI.next()
        }
      }
    )

  }

}, false)
