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
function createCompanyWindow() {
  companyWindow = new BrowserWindow({
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
  companyWindow.loadFile("companyWindow.html");
  companyWindow.once("ready-to-show", () => {
    companyWindow.maximize();
    companyWindow.show();
  });
}
function createEmployeeWindow() {
  employeeWindow = new BrowserWindow({
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
  employeeWindow.loadFile("employeeWindow.html");
  employeeWindow.once("ready-to-show", () => {
    employeeWindow.maximize();
    employeeWindow.show();
  });
}
function createProvidersWindow() {
  providersWindow = new BrowserWindow({
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
  providersWindow.loadFile("providersWindow.html");
  providersWindow.once("ready-to-show", () => {
    providersWindow.maximize();
    providersWindow.show();
  });
}
ipcMain.on("openChildWindow", (event, arg) => {
  createChildWindow();
  mainWindow.hide();
});
ipcMain.on("openCompany", (event, arg) => {
  createCompanyWindow();
  childWindow.hide();
});
ipcMain.on("closeChildWindow", (event, arg) => {
  childWindow.close();
  mainWindow.show();
});
ipcMain.on("closeCompanyWindow", (event, arg) => {
  companyWindow.close();
  childWindow.show();
});
ipcMain.on("openEmployee", (event, arg) => {
  createEmployeeWindow();
  companyWindow.hide();
});
ipcMain.on("openProviders", (event, arg) => {
  createProvidersWindow();
  companyWindow.hide();
});
ipcMain.on("closeEmployeeWindow", (event, arg) => {
  employeeWindow.close();
  companyWindow.show();
});
ipcMain.on("closeProvidersWindow", (event, arg) => {
  providersWindow.close();
  companyWindow.show();
});