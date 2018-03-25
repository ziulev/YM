const NotificationCenter = require('node-notifier').NotificationCenter;

const notifier = new NotificationCenter({
  withFallback: false,
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
        contentImage: 'http://avatars.yandex.net/get-music-content/63210/94165464.a.2497608-1/50x50',
        wait: false,
        timeout: 5,
        actions: 'next',
      },
      (error, response, metadata) => {
        if (metadata.activationValue === 'next') {
          externalAPI.next()
        }
      }
    );

  }

}, false);
