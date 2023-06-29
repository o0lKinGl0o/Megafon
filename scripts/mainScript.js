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
function recordTable(table,elements,query,pK){
    connection.query(query, 
    function (error, results, fields){
        results.forEach(result => {
            let isFirstKey = true;
            let firstKey;
            for (const key in elements) {
                let x = elements[key]
                if (isFirstKey) {
                    isFirstKey = false;
                    document.getElementById(key+'Rec').id='tr'+result[x];
                    document.getElementById('updRec').value=result[x];
                    document.getElementById('updRec').id='upd'+result[x];
                    document.getElementById('saveButRowRec').value=result[x];
                    document.getElementById('saveButRowRec').id='saveButRow'+result[x];
                    document.getElementById('cancelUpdRec').id='cancelUpd'+result[x];
                    document.getElementById('cancelUpdButRec').value=result[x];
                    document.getElementById('cancelUpdButRec').id='cancelUpdBut'+result[x];
                    document.getElementById('delColRec').id='delCol'+result[x];
                    document.getElementById('delColButRec').value=result[x];
                    document.getElementById('delColButRec').id='delColBut'+result[x];
                    firstKey = result[x];
                    continue;
                }
                document.getElementById(key+'Rec').value+=result[x];
                document.getElementById(key+'Rec').id=key+firstKey;
            }
            try{
                if (selectsQuery){
                    selectsQuery.forEach(selectElement=>{
                        document.getElementById(selectElement.id).innerHTML=`<option selected>${result[selectElement.columnGoods]}</option>`;
                        let idSelect = selectElement.id.replace(/Rec/g, '');
                        document.getElementById(selectElement.id).id=idSelect+firstKey;
                        connection.query(selectElement.query, function(error, resultsOpt, fields){
                            resultsOpt.forEach(resultOpt=>{
                                document.getElementById(idSelect+firstKey).innerHTML+=`<option>${resultOpt[selectElement.column]}</option>`;
                            })
                        })
                    })
                }
            } catch {}
            try{
                imagesQuery.forEach(img=>{
                    document.getElementById(img.id).src=result[img.column];
                    let idSelect = img.id.replace(/Rec/g, '');
                    document.getElementById(img.id).id=idSelect+firstKey;
                })
            } catch {}
        }) 
    })
}
function updCol(id){
    for (const key in elements) {
        document.getElementById(key + id).readOnly = false;
    }
    //try{
        imagesQuery.forEach(img=>{
            let idFile = img.id.replace(/Rec/g, '')+'Upd'+id;
            document.getElementById(idFile).classList.toggle('hide');
        })
    //}catch  {}
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
    try{
        selectsQuery.forEach(select=>{
            let idSelect = select.id.replace(/Rec/g, '')+id;
            connection.query(`UPDATE megafon.${table} SET 
            ${select.columnGoods} = '${document.getElementById(idSelect).value}' 
            WHERE ${firstKey}=${id};`, 
            function (error, results, fields){
                if (error) {
                    let messageError = `
                    <div class = 'windowError' id ='windowError'>
                        <h3>Проверьте правильность введенного поля ${select.columnGoods}</h3>
                        <button class="" onclick="closeError()">ОК</button>
                    </div>`;
                    windowError(messageError);
                };
            })
        }) 
    } catch{}  
}
function filter(inputsFilter){
    for (const key in inputsFilter) {
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
    const selectElement = document.querySelector('select');
    if (selectElement) {
        addSelect();
    }
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
    let cleanedPath;
    document.querySelectorAll('.updBut').forEach(results => {
        lastElems=Number(results.value)+1
    });
    if (lastElems==undefined) lastElems = 1;
    let columnQuery=pK+', ';
    let inputsQuery=lastElems+', ';
    try{
            imagesQuery.forEach(img=>{
            columnQuery+=img.column+', ';
            let pathPhoto = document.getElementById(img.id).value;
            cleanedPath = pathPhoto.replace(/^.*\\/, '');
            inputsQuery+="'"+cleanedPath+"', ";
        })
    } catch{}
    try{
        if (selectsQuery) {
            selectsQuery.forEach(opt=>{
                columnQuery+=opt.columnGoods+", ";
                inputsQuery+="'"+document.getElementById(opt.id).value+"', ";
            })
        };
    } catch (error){
        throw error
    }
    let isFirstKey = true;
    let lastElement;
    for (let key in elements) {
        lastElement = elements[key];
    }
    if (lastElement==undefined)lastElement=1;
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
            //windowError(messageError);
            throw error;
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
    try{
        imagesQuery.forEach(img=>{
            let idFile = img.id.replace(/Rec/g, '')+'Upd'+lastElems;
            document.getElementById(img.id).classList.toggle('hide');
            document.getElementById(img.id).id=idFile;
            document.getElementById('td'+img.id).appendChild(newPhoto);
            document.getElementById('td'+img.id).id='';
            let idPhoto = img.id.replace(/Rec/g, '')+lastElems;
            document.getElementById(img.id).id=idPhoto;
            document.getElementById(idPhoto).src=cleanedPath;
            document.getElementById(idPhoto).style.width='50px';
        })
    }catch{}
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
function addSelect(){
    selectsQuery.forEach(selectOpt=>{
        connection.query(selectOpt.query, function(error, results, fields){
            results.forEach(result=>{
                document.getElementById(selectOpt.id).innerHTML+='<option>'+result[selectOpt.column]+'</option>';
            })
        })
    })
}