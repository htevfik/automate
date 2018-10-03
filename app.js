module.exports = App;

const
  ioHook = require('iohook'),
  robotjs = require('robotjs');

function App(shortcut, interval) {
  if (!(this instanceof App)) {
    return new App(...arguments);
  }

  this.status = false;
  this.shortcut = shortcut || 'C';
  this.interval = interval || 11e3;

  ioHook.on('keypress', this.check.bind(this));
  ioHook.start();
}

App.prototype.check = function (event) {
  const char = String.fromCharCode(event.rawcode);
  if (event.altKey && char == this.shortcut) {
    this.status = !this.status;
    setTimeout(this.run.bind(this), 1e3);
  }
}

App.prototype.run = function () {
  clearInterval(this.timer);

  if (this.status) {
    console.log('automate is activated');
    this.play();
    this.timer = setInterval(this.play.bind(this), this.interval)
  } else {
    console.log('automate is disabled');
  }
}

App.prototype.playString = function () {
  return '-slot ' + Math.round(Math.random() * 80 + 20);
}

App.prototype.play = function () {
  robotjs.typeString(this.playString());
  robotjs.keyTap('enter');
}