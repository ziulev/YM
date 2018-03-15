const NotificationCenter = require('node-notifier').NotificationCenter;

var notifier = new NotificationCenter({
  withFallback: false,
  // customPath: './assets/icons/mac/icon.icns'
});

document.addEventListener('DOMSubtreeModified', (event) => {

  const trackTitle = event.target.querySelector('.track__title')

  if (event.target.className === 'player-controls__track-container' && trackTitle && externalAPI.isPlaying()) {

    const currentTrack = externalAPI.getCurrentTrack()

    notifier.notify(
      {
        title: 'Yandex.music',
        subtitle: `${currentTrack.artists[0].title}`,
        message: `${currentTrack.title}`,
        icon: './assets/icons/mac/icon.icns', // Absolute Path to Triggering Icon
        contentImage: 'http://avatars.yandex.net/get-music-content/63210/94165464.a.2497608-1/50x50', // Absolute Path to Attached Image (Content Image)
        wait: false, // Wait for User Action against Notification or times out. Same as timeout = 5 seconds
        timeout: 5, // Takes precedence over wait if both are defined.
        actions: 'next', // String | Array<String>. Action label or list of labels in case of dropdown
      },
      (error, response, metadata) => {
        if (metadata.activationValue === 'next') {
          externalAPI.next()
        }
      }
    );

  }

}, false);

