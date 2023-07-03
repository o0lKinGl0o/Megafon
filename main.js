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
function createChildUserWindow() {
  childUserWindow = new BrowserWindow({
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
  childUserWindow.loadFile("mainUserWindow.html");  
  childUserWindow.once("ready-to-show", () => {
    childUserWindow.maximize();
    childUserWindow.show();
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
function createUserCompanyWindow() {
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
  companyWindow.loadFile("UserCompanyWindow.html");
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
function createUserEmployeeWindow() {
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
  employeeWindow.loadFile("UserEmployeeWindow.html");
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
function createClientsWindow() {
  clientsWindow = new BrowserWindow({
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
  clientsWindow.loadFile("clientsWindow.html");
  clientsWindow.once("ready-to-show", () => {
    clientsWindow.maximize();
    clientsWindow.show();
  });
}
function createGoodsWindow() {
  goodsWindow = new BrowserWindow({
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
  goodsWindow.loadFile("goodsWindow.html");
  goodsWindow.once("ready-to-show", () => {
    goodsWindow.maximize();
    goodsWindow.show();
  });
}
function createOrdersWindow() {
  ordersWindow = new BrowserWindow({
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
  ordersWindow.loadFile("ordersWindow.html");
  ordersWindow.once("ready-to-show", () => {
    ordersWindow.maximize();
    ordersWindow.show();
  });
}
function createPriceListWindow() {
  priceListWindow = new BrowserWindow({
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
  priceListWindow.loadFile("priceListWindow.html");
  priceListWindow.once("ready-to-show", () => {
    priceListWindow.maximize();
    priceListWindow.show();
  });
}
function creatStatOrderWindow() {
  statOrderWindow = new BrowserWindow({
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
  statOrderWindow.loadFile("statOrderWindow.html");
  statOrderWindow.once("ready-to-show", () => {
    statOrderWindow.maximize();
    statOrderWindow.show();
  });
}
ipcMain.on("openChildWindow", (event, arg) => {
  createChildWindow();
  mainWindow.hide();
});
ipcMain.on("openUserChildWindow", (event, arg) => {
  createChildUserWindow();
  mainWindow.hide();
});
ipcMain.on("openCompany", (event, arg) => {
  createCompanyWindow();
  childWindow.hide();
});
ipcMain.on("openUserCompany", (event, arg) => {
  createUserCompanyWindow();
  childUserWindow.hide();
});
ipcMain.on("closeChildWindow", (event, arg) => {
  childWindow.close();
  mainWindow.show();
});
ipcMain.on("closeCompanyWindow", (event, arg) => {
  companyWindow.close();
  childUserWindow.show();
});
ipcMain.on("openUserEmployee", (event, arg) => {
  createUserEmployeeWindow();
  companyWindow.hide();
});
ipcMain.on("openEmployee", (event, arg) => {
  createEmployeeWindow();
  companyWindow.hide();
});
ipcMain.on("openStatOrder", (event, arg) => {
  creatStatOrderWindow();
  ordersWindow.hide();
});
ipcMain.on("openProviders", (event, arg) => {
  createProvidersWindow();
  companyWindow.hide();
});
ipcMain.on("openClients", (event, arg) => {
  createClientsWindow();
  childWindow.hide();
});
ipcMain.on("openGoods", (event, arg) => {
  createGoodsWindow();
  childWindow.hide();
});
ipcMain.on("openOrders", (event, arg) => {
  createOrdersWindow();
  childWindow.hide();
});
ipcMain.on("openPriceList", (event, arg) => {
  createPriceListWindow();
  goodsWindow.hide();
});
ipcMain.on("closeStatOrderWindow", (event, arg) => {
  statOrderWindow.close();
  ordersWindow.show();
});
ipcMain.on("closeClientsWindow", (event, arg) => {
  clientsWindow.close();
  childWindow.show();
});
ipcMain.on("closeEmployeeWindow", (event, arg) => {
  employeeWindow.close();
  companyWindow.show();
});
ipcMain.on("closeProvidersWindow", (event, arg) => {
  providersWindow.close();
  companyWindow.show();
});
ipcMain.on("closeGoodsWindow", (event, arg) => {
  goodsWindow.close();
  childWindow.show();
});
ipcMain.on("closePriceListWindow", (event, arg) => {
  priceListWindow.close();
  goodsWindow.show();
});
ipcMain.on("closeUserChildWindow", (event, arg) => {
  childUserWindow.close();
  mainWindow.show();
});
ipcMain.on("closeOrdersWindow", (event, arg) => {
  ordersWindow.close();
  childWindow.show();
});