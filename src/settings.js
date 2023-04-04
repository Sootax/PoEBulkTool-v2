const Store = require('electron-store');
const path = require('path');

const config = {
  name: 'config',
  fileExtension: 'json',
  cwd: path.resolve(__dirname)
}
const storage = new Store(config);

// Gets the saved bounds of the window and returns default bounds if it does not exist.
function getBounds() {
  const defaultBounds = {
    height: 800,
    width: 600,
    x: 0,
    y: 0,
  };
  const customBounds = storage.get('main');
  if (customBounds) {
    return customBounds;
  } else {
    storage.set('main', defaultBounds);
    return defaultBounds;
  }
}

// Saves the bounds of the window.
function saveBounds(bounds) {
  storage.set('main', bounds);
}

// Set config by key
function setConfig(configKey) {
	storage.set(configKey)
}

// Get config by key
function getConfig(configKey) {
	return storage.get(configKey)
}

module.exports = {
  getBounds: getBounds,
  saveBounds: saveBounds,
	getConfig: getConfig,
	setConfig: setConfig,
};
