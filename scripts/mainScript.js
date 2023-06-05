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
function addContent(results, contentTable){
    results.forEach(results => {
        document.getElementById('rowTable').innerHTML+=contentTable;
    })
}
function queryShowTable(table,contentTable){
    connection.query(`SELECT * FROM megafon.${table};`, 
    function (error, results, fields){
        addContent(results, contentTable);
    })
}
function recordTable(table,elements,query){
    connection.query(query, 
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
function filter(inputsFilter){
    for (const key in inputsFilter) {
        console.log(`${key}`);
        document.getElementById(`${key}`).addEventListener('input', filterTable);  
        function filterTable() {
        const searchValue = document.getElementById(key).value.toLowerCase();
        const rows = document.querySelectorAll('#rowTable tr');
        rows.forEach(row => {
            const fieldValue = row.querySelector('.'+inputsFilter[key]).value.toLowerCase();
            if (fieldValue.includes(searchValue)) {
            row.style.display = 'table-row';
            } else {
            row.style.display = 'none';
            }
        });
        }
    }
}
function addRows(){
    document.getElementById('rowTable').appendChild(newRow);
    hideButtonSaveRow();
}
function canceladdRows(){
    document.getElementById('trRec').remove();
    hideButtonSaveRow();
}
function hideButtonSaveRow(){
    document.getElementById('addRows').classList.toggle('hide')
    document.getElementById('addRowsInDB').classList.toggle('hide')
    document.getElementById('canceladdRows').classList.toggle('hide')
}
function addRowsInDB(table){
    let lastElems;
    document.querySelectorAll('.updBut').forEach(results => {
        lastElems=Number(results.value)+1
    });
    let columnQuery=pK+', ';
    let inputsQuery=lastElems+', ';
    let isFirstKey = true;
    let lastElement;
    for (let key in elements) {
        lastElement = elements[key];
    }
    for (const key in elements) {
        if (isFirstKey){
            isFirstKey = false;
            continue;
        }
        if (lastElement!=elements[key]) {
            columnQuery+=elements[key]+', ';
            inputsQuery+=`'${document.getElementById(key+'Rec').value}', `;
        }
        else {
            columnQuery+=elements[key]; 
            inputsQuery+=`'${document.getElementById(key+'Rec').value}'`;
        }
    }
    connection.query(`INSERT INTO megafon.${table} (${columnQuery})
    values (${inputsQuery});`, function (error, results, fields){
        if (error){
            let messageError=`
                <div class = 'windowError' id ='windowError'>
                    <h3>Проверьте правильность введенных полей при добавлении в таблицу ${table}</h3>
                    <button class="" onclick="closeError()">ОК</button>
                </div>`
            windowError(messageError);
        }
        else results;
    })
    for (const key in elements) {
        document.getElementById(key+'Rec').readOnly=true;
        document.getElementById(key+'Rec').id = key+lastElems;
    }
    hideButtonSaveRow();
    document.getElementById('saveButRowRec').value=lastElems;
    document.getElementById('saveButRowRec').id='saveButRow'+lastElems;
    document.getElementById('cancelUpdRec').value=lastElems;
    document.getElementById('cancelUpdRec').id='cancelUpd'+lastElems;
    document.getElementById('cancelUpdButRec').value=lastElems;
    document.getElementById('cancelUpdButRec').id='cancelUpdBut'+lastElems;
    document.getElementById('updRec').classList.toggle('hide');
    document.getElementById('updRec').value=lastElems;
    document.getElementById('updRec').id='upd'+lastElems;
    document.getElementById('delColRec').classList.toggle('hide');
    document.getElementById('delColRec').id='delCol'+lastElems;
    document.getElementById('delColButRec').value=lastElems;
    document.getElementById('delColButRec').id='delColBut'+lastElems;
}
function delCol(id, table, primKey){
    connection.query(`DELETE FROM megafon.${table} WHERE ${primKey} = ${id};`, function (error, results, fields){
        if (error) throw error;
    });
    document.getElementById('tr'+id).remove();
}
function sortBy(table,valSort){
    let addRow = document.getElementById('rowTable');
    addRow.innerHTML = '';
    connection.query(`SELECT * FROM megafon.${table} ORDER BY ${valSort};`, function (error, results, fields){
      if (error) throw error;
      else{
        results.forEach(results => {
            document.getElementById('rowTable').innerHTML+=contentTable;
        });
      }
    });
    let query=`SELECT * FROM megafon.${table} ORDER BY ${valSort};`;
    recordTable(table,elements,query);
}
  
