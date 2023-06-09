// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
import fetchStash from 'Functions/fetchStash.js'
import fetchPoeNinjaPrices from 'Functions/fetchPoeNinjaPrices.js'
import fetchTftPrices from 'Functions/fetchTftPrices.js'
import generateStashConfig from 'Functions/generateStashConfig.js'
import filterStash from 'Functions/generateNewTableData.js'

const { app, BrowserWindow, ipcMain } = require('electron')
const { getBounds, saveBounds, getConfig, setConfig } = require('./settings.js')
const path = require('path')
const fs = require('fs')
require('update-electron-app')({
  repo: 'https://github.com/Sootax/PoEBulkTool-v2'
})

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit()
}

const createWindow = () => {
  // Gets the bounds of the window.
  const bounds = getBounds()

  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: bounds.width,
    height: bounds.height,
    x: bounds.x,
    y: bounds.y,
    show: false,
    icon: __dirname + '/icon.ico',
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
    }
  })

  mainWindow.on('close', () => saveBounds(mainWindow.getBounds()))

  // Create the loading window.
  const loadingWindow = new BrowserWindow({
    maxWidth: 450,
    maxHeight: 300,
    icon: path.resolve(__dirname, '/icon.ico'),
    frame: false,
    alwaysOnTop: true
  })

  // Load the loadingScreen.html for the loadingWindow.
  loadingWindow.loadFile('./src/loadingScreen.html')

  // Center the loadingWindow.
  loadingWindow.center()

  // Load the index.html of the mainWindow
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

  // Removes the menu from the mainWindow.
  mainWindow.setMenu(null)

  // Open the DevTools if in development.
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools()
  }

  // Waits for the mainWindow to be loaded and closes the loadingWindow.
  mainWindow.once('ready-to-show', () => {
    loadingWindow.close()
    mainWindow.show()
  })

  return mainWindow
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// Reads and sends the config back if exists, creates the config if not.
ipcMain.on('getConfig', (event, configKey) => {
  event.reply('getConfig', getConfig(configKey))
})

// Writes config with new data and returns the new config.
ipcMain.on('setConfig', (event, configKey, data) => {
  setConfig(configKey, data)
})

// Fetches the stash data based on active tab.
ipcMain.on('fetchStash', async (event, activeCategory) => {
  const config = getConfig('renderer')
  let tabIndex
  if (activeCategory === 'Expedition') {
    tabIndex = config.expeditionTab
  } else if (activeCategory === 'Heist') {
    tabIndex = config.heistTab
  } else if (activeCategory === 'Compasses') {
    tabIndex = config.compassesTab
  }
  const generatedConfig = generateStashConfig(config, 1)
  const rawStashData = await fetchStash(generatedConfig)
  const poeNinjaPrices = await fetchPoeNinjaPrices(config.leagueName)
  const tftPrices = await fetchTftPrices()
  const filteredStashData = filterStash(rawStashData, tftPrices)
  fs.writeFileSync('stashData.json', JSON.stringify(filteredStashData, null, 4))
  event.reply('fetchStash', filteredStashData)
})

ipcMain.on('readStash', async (event) => {
  const stashData = JSON.parse(fs.readFileSync('stashData.json', 'utf-8'))
  console.log('readStash')
  event.reply('readStash', stashData)
})
