const { app, screen, ipcMain, BrowserWindow } = require('electron');

// Create the browser window
const createWindow = () => {
    // Get the primary display
    let mainScreen = screen.getPrimaryDisplay();
    // Get the dimensions of the primary display
    let dimensions = mainScreen.size;

    console.log(dimensions);

    //this is the window that will be displayed and the dimensions are set to the dimensions of the primary display
    const win = new BrowserWindow({
        width: dimensions.width,
        height: dimensions.height,
        frame: false,
    });

    // To full screen
    //win.maximize();
    
    // Load the index.html of the app
    //win.loadFile('./CastleGraphicsJS/tests/test.html');
    win.loadFile('./index.html');
}

// Listen for the request-data event from the renderer process
ipcMain.on('request-data', (event) => {
  event.sender.send('response-data', data)
});

// Have to wait until the app is ready before creating the window
app.whenReady().then(() => {
    createWindow()
});

// Quit when all windows are closed, except on macOS
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
});