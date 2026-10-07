const { app, BrowserWindow, session } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 340,
    minWidth: 500,
    minHeight: 280,
    titleBarStyle: 'hidden',  // no title bar; drag anywhere that isn't a control
    backgroundColor: '#222222',
    alwaysOnTop: true
  });

  // Float above normal windows, on every Space, and over full-screen apps.
  win.setAlwaysOnTop(true, 'floating');
  win.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  // visibleOnFullScreen turns the app into a background (UI element) app, which
  // hides it from the Dock and Cmd+Tab. Bring the Dock icon back.
  app.dock.show();

  // App-only styles, so the web version stays untouched: make the window
  // draggable, keep the toggles clickable, and clear the traffic-light buttons.
  win.webContents.on('did-finish-load', () => {
    win.webContents.insertCSS(`
      body { -webkit-app-region: drag; padding-top: 36px; user-select: none; }
      label, input { -webkit-app-region: no-drag; }
    `);
  });

  win.loadFile(path.join(__dirname, 'public', 'index.html'));
}

app.whenReady().then(() => {
  // Grant MIDI access without a prompt; deny everything else.
  const allowed = ['midi', 'midiSysex'];
  session.defaultSession.setPermissionRequestHandler((_wc, permission, callback) => {
    callback(allowed.includes(permission));
  });
  session.defaultSession.setPermissionCheckHandler((_wc, permission) => allowed.includes(permission));

  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => app.quit());
