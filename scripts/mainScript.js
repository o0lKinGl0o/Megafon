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
function windowError(messageError){
    document.body.innerHTML+='<div class="transbox" id="transbox">'+messageError+'</div>';
    document.getElementById('transbox').classList.toggle('transboxActive');
}
function closeError(){
    document.getElementById('transbox').remove();
}
function closeApp(){
    const ipc = window.require('electron').ipcRenderer;
    ipc.send('closeApp');
}