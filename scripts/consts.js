const mysql  = require('mysql');
const ipc = window.require('electron').ipcRenderer;
function conFunc(){
    const connection = mysql.createConnection({
      host     : '127.0.0.1',
      user     : 'root',
      password : 'root',
      database : 'megafon',
      dateStrings: true
    });
    connection.connect();
    return connection;
}
const connection = conFunc();
const PDFDocument = require('pdfkit');
const fs = require('fs');
