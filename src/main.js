const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 886,
    height: 653,
    show: false,
    icon: __dirname + '/icon.ico',
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  // Create the loading window.
  const loadingWindow = new BrowserWindow({
    maxWidth: 450,
    maxHeight: 300,
    icon: path.resolve(__dirname, '/icon.ico'),
    frame: false,
    alwaysOnTop: true,
  });

  // Load the loadingScreen.html for the loadingWindow.
  loadingWindow.loadFile('./src/loadingScreen.html');

  // Center the loadingWindow.
  loadingWindow.center();

  // Load the index.html of the mainWindow
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Removes the menu from the mainWindow.
  mainWindow.setMenu(null);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Waits for the mainWindow to be loaded and closes the loadingWindow.
  mainWindow.once('ready-to-show', () => {
    loadingWindow.close();
    mainWindow.show();
  });

  return mainWindow;
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
import fetchStash from 'Functions/fetchStash.js';
import fetchPoeNinjaPrices from 'Functions/fetchPoeNinjaPrices.js';
import fetchTftPrices from 'Functions/fetchTftPrices.js';
import generateNewTableData from 'Functions/generateNewTableData';

ipcMain.on('readConfig', (event, data) => {
  try {
    event.reply(
      'configData',
      JSON.parse(fs.readFileSync('./src/userConfig.json', 'utf-8'))
    );
  } catch (err) {
    if (err.code == 'ENOENT') {
      fs.writeFileSync('./src/userConfig.json', JSON.stringify({}, null, 4));
    }
  }
});

ipcMain.on('writeConfig', (event, data) => {
  const jsonData = JSON.stringify(data, null, 4);
  fs.writeFileSync('./src/userConfig.json', jsonData, 'utf-8');
  event.reply(
    'configData',
    JSON.parse(fs.readFileSync('./src/userConfig.json', 'utf-8'))
  );
});

ipcMain.on('fetchStash', async (event) => {
  // const config = JSON.parse(fs.readFileSync('./src/userConfig.json', 'utf-8'))
  // const stashItems = await fetchStash(config)
  // const poeNinjaItemPrices = await fetchPoeNinjaPrices(config.leagueName)
  // const tftItemPrices = await fetchTftPrices()
  // const poeNinjaPrices = JSON.parse(fs.readFileSync('./poePrices.json', 'utf-8'))
  // const stashItems = JSON.parse(fs.readFileSync('./stashData.json', 'utf-8'))
  // const tftPricesCompasses = JSON.parse(fs.readFileSync('./poeTftPricescompasses.json', 'utf-8'))
  // const tftPricesExpedition = JSON.parse(fs.readFileSync('./poeTftPricesexpedition.json', 'utf-8'))
  // const tftPricesHeist = JSON.parse(fs.readFileSync('./poeTftPricesheist.json', 'utf-8'))
  // const newTables = generateNewTableData(stashItems, tftPricesCompasses, tftPricesExpedition, tftPricesHeist)
});
