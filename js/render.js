const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;

ipcRenderer.on('main-process-messages',(event,message)=>{
    console.log('message from Main Process:', 'webContents event "did-finish-load" called ');
});

ipcRenderer.on('asynchronous-reply', (event, arg) => {
    console.log('asynchronous-reply: %O %O', event, arg);
});
ipcRenderer.send('asynchronous-message', 'hello');
  