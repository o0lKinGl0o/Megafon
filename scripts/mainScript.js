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
    location.reload();
}
function closeApp(){
    const ipc = window.require('electron').ipcRenderer;
    ipc.send('closeApp');
}
function openWindow(window){
    ipc.send('open'+window);
}
function closeWindow(window){
    ipc.send('close'+window+'Window');
}
function queryShowTable(table,contentTable){
    connection.query(`SELECT * FROM megafon.${table};`, 
    function (error, results, fields){
        results.forEach(results => {
            document.getElementById('rowTable').innerHTML+=contentTable;
        })
    })
}
function recordTable(table,elements){
    connection.query(`SELECT * FROM megafon.${table};`, 
    function (error, results, fields){
        results.forEach(results => {
            let isFirstKey = true;
            let firstKey;
            for (const key in elements) {
                let x = elements[key]
                if (isFirstKey) {
                    isFirstKey = false;
                    document.getElementById(key+'Rec').id='tr'+results[x];
                    document.getElementById('updRec').value=results[x];
                    document.getElementById('updRec').id='upd'+results[x];
                    document.getElementById('saveButRowRec').value=results[x];
                    document.getElementById('saveButRowRec').id='saveButRow'+results[x];
                    document.getElementById('cancelUpdRec').id='cancelUpd'+results[x];
                    document.getElementById('cancelUpdButRec').value=results[x];
                    document.getElementById('cancelUpdButRec').id='cancelUpdBut'+results[x];
                    document.getElementById('delColRec').id='delCol'+results[x];
                    document.getElementById('delColButRec').value=results[x];
                    document.getElementById('delColButRec').id='delColBut'+results[x];
                    firstKey = results[x];
                    continue;
                }
                document.getElementById(key+'Rec').value+=results[x];
                document.getElementById(key+'Rec').id=key+firstKey;
            }
        })
    })
}
function updCol(id){
    for (const key in elements) {
        document.getElementById(key + id).readOnly = false;
    }
    hideButton(id);
}
function hideButton(id){
    document.getElementById('upd'+id).classList.toggle('hide');
    document.getElementById('saveButRow'+id).classList.toggle('hide');
    document.getElementById('cancelUpd'+id).classList.toggle('hide');
    document.getElementById('delColBut'+id).classList.toggle('hide');
}
function save(id){
    updCol(id);    
    let isFirstKey = true;
    let firstKey;
    for (const key in elements) {
        if (isFirstKey) {
            isFirstKey = false;
            firstKey = elements[key];
            continue;
        }
        connection.query(`UPDATE megafon.${table} SET 
        ${elements[key]} = '${document.getElementById(key+id).value}' 
        WHERE ${firstKey}=${id};`, 
        function (error, results, fields){
            if (error) {
                let messageError = `
                <div class = 'windowError' id ='windowError'>
                    <h3>Проверьте правильность введенного поля ${elements[key]}</h3>
                    <button class="" onclick="closeError()">ОК</button>
                </div>`;
                windowError(messageError);
            };
        })
    }   
}