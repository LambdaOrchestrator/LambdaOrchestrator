// Modules to control application life and create native browser window
const {
  app, BrowserWindow, Menu, dialog, ipcMain,
} = require('electron');
require('electron-reload')(__dirname);

const fs = require('fs');

const exec = require("child_process").exec; 


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function credentialCheck(){
 exec('aws sts get-caller-identity', function (err, stdout, stderr) { 
   checkResponse(stdout)
  });
}

function checkResponse(terminalResponse){
  let isJSON;
  try{
    isJSON = JSON.parse(terminalResponse);
  }
  catch(err){
  }
  isJSON ? isLoggedIn(true):isLoggedIn(false);
  // isJSON ? setProfile(isJSON):'';
}

// function setProfile(credentials){
//   let Arn = credentials.Arn.split(":");
//   let name = Arn[Arn.length-1].split("/")[1];
//   global.username = name;
// }

function isLoggedIn(loggedIn){
 
  if(loggedIn){
    createWindow();
  }
  else{
    mainWindow = new BrowserWindow({
      width:300,
      height:150
    })
    mainWindow.loadFile('public/noLogin.html')
  }
}

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1440,
    options: {
      fullscreen: true,
    },
  });
  
  // and load the index.html of the app.
  mainWindow.loadFile('dist/index.html');
  
  // Set main menu
  setMainMenu();

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

function setMainMenu() {
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Open File',
          accelerator: 'Ctrl+O',
          click() {
            const openPath = dialog.showOpenDialog({ properties: ['openFile'] })[0];
            const content = fs.readFileSync(openPath);
            const configObject = JSON.parse(content);
            mainWindow.webContents.send('openFile', configObject);
          },
        },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  
  Menu.setApplicationMenu(menu);
}

// Listener for clicking the run button on the front-end
ipcMain.on('run', (event) => {
  // This is where we should invoke the step function
  // To rerender diagram, call below function, passing in function name and status
  // mainWindow.webContents.send('rerender', func, status);
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', credentialCheck);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
