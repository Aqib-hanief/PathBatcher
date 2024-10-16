const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 400,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    autoHideMenuBar: true  // This hides the menu bar by default
  });

  mainWindow.loadFile('index.html');
}

app.whenReady().then(createWindow);

ipcMain.on('create-batch-file', (event, filePaths) => {
  let batchContent = '@echo off\n';
  filePaths.forEach(filePath => {
    batchContent += `start "" "${filePath}"\n`;
  });

  // Save the batch file on the desktop
  const filePath = path.join(app.getPath('desktop'), 'run-files.bat');
  fs.writeFileSync(filePath, batchContent);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
