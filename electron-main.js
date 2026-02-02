const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 800,
    backgroundColor: '#0a0a0a',
    title: 'SecureGen - Generador de Contraseñas',
    frame: true,
    resizable: true
  });

  // Detecta si estamos en desarrollo o en la versión compilada
  const isDev = process.env.npm_lifecycle_event === 'start';

  if (isDev) {
    // En desarrollo carga desde localhost
    win.loadURL('http://localhost:3000');
  } else {
    // En producción carga el archivo index.html del build
    const indexPath = path.join(__dirname, 'index.html');
    console.log('Loading from:', indexPath);
    win.loadFile(indexPath);
  }

  // Quitar el menú
  win.setMenuBarVisibility(false);
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
