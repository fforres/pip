const { app, BrowserWindow } = require('electron');
const path = require('path');
const hotkey = require('hotkeys-js');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();


  let isFocused = false
  let isIgnored = false
  window.addEventListener("focus", () => {
    isFocused = true
  })
  window.addEventListener("focusin", () => {
    isFocused = true
  })
  window.addEventListener("focusout", () => {
    isFocused = false
  })
  hotkeys('ctrl+alt+d', function (event, handler){
    if (isFocused) {
      if(isIgnored) {
        mainWindow.setIgnoreMouseEvents(true)
        mainWindow.setOpacity(0.7)
      } else {
        mainWindow.setIgnoreMouseEvents(false)
        mainWindow.setOpacity(1)
      }
    }
  });
  

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
