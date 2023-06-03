const { app, BrowserWindow, ipcMain } = require('electron');
require('@electron/remote/main').initialize()
let mainWindow;
function createWindow() {
  process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";
  mainWindow = new BrowserWindow({
    hasShadow: false,
    //devTools: false,
    //frame: false,
    webPreferences: {
      //devTools: false,
      nodeIntegration: true,
      contextIsolation: false,
    },
    show: false,
  })
  mainWindow.loadFile('index.html');
  mainWindow.maximize();
  mainWindow.show();
}
app.whenReady().then(() => {
    createWindow();
    app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
      }
    });
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
ipcMain.on("closeApp", (event, arg) => {
  mainWindow.close();
});
app.on('activate-with-no-open-windows', function(){
  mainWindow.show();
});
function createChildWindow() {
  childWindow = new BrowserWindow({
    modal: true,
    show: false,
    hasShadow: false,
    //devTools: false,
    //titleBarStyle: `hidden`,
    //skipTaskbar:false,
    webPreferences: {
      //devTools: false,
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
  });
  childWindow.loadFile("mainWindow.html");  
  childWindow.once("ready-to-show", () => {
    childWindow.maximize();
    childWindow.show();
  });
}
ipcMain.on("openChildWindow", (event, arg) => {
  createChildWindow();
  //mainWindow.hide();
});