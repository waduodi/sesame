const { app, BrowserWindow, screen } = require("electron");
const path = require("path");

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;
  const aspectRatio = width / height;

  const win = new BrowserWindow({
    width,
    height,
    resizable: true, // allow resizing for ease of use (fullscreen kinda clunky)
    maximizable: false,
    autoHideMenuBar: true,
    icon: path.join(__dirname, "images", "favicon.ico"),
    webPreferences: {
      nodeIntegration: true
    }
  });


  // listener to maintain aspect ratio on resize
  win.on("will-resize", (event, newBounds) => {
    const newWidth = newBounds.width;
    const newHeight = Math.round(newWidth / aspectRatio);
    event.preventDefault();
    win.setBounds({ width: newWidth, height: newHeight });
  });

  win.loadFile(path.join(__dirname, "index.html"));
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});