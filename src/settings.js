const Store = require('electron-store')

const config = {
  name: 'config',
  fileExtension: 'json',
  cwd: './src'
}
const storage = new Store(config)
const rendererTemplate = {
  accountName: '',
  characterName: '',
  sessionId: '',
  leagueName: '',
  expeditionTab: 0,
  compassesTab: 0,
  heistTab: 0,
  tabs: 1
}

// Gets the saved bounds of the window and returns default bounds if it does not exist.
function getBounds () {
  const defaultBounds = {
    height: 800,
    width: 600,
    x: 0,
    y: 0
  }
  const customBounds = storage.get('main')
  if (customBounds) {
    return customBounds
  } else {
    storage.set('main', defaultBounds)
    return defaultBounds
  }
}

// Saves the bounds of the window.
function saveBounds (bounds) {
  storage.set('main', bounds)
}

// Set config by key
function setConfig (configKey, data) {
  storage.set(configKey, data)
  console.log(storage.get(configKey), 'settings.js')
}

// Get config by key
function getConfig(configKey) {
  const config = storage.get(configKey)
  if (config) {
    console.log(config, 'exists')
    return config
  } else {
    console.log(config, 'does not exist')
    storage.set(configKey, rendererTemplate)
    return storage.get(configKey)
  }
}

module.exports = {
  getBounds,
  saveBounds,
  getConfig,
  setConfig
}
