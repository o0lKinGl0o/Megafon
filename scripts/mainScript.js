function windowError(messageError){
    document.body.innerHTML+='<div class="ErrorWindow" id="ErrorWindow">'+messageError+'</div>';
    document.getElementById('ErrorWindow').classList.toggle('ErrorWindowActive');
}
function closeError(){
    document.getElementById('ErrorWindow').remove();
    location.reload();
}
function closeChildWindow(){
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
function addContent(results, contentTable,idTable){
    results.forEach(results => {
        document.getElementById(idTable).innerHTML+=contentTable;
    })
}
function updCol(id, elements, flag){
    let isFirstKey=true;
    for (const key in elements) {
        if (isFirstKey){
            isFirstKey=false;
            continue;
        }
        document.getElementById(key + id).readOnly = false;
    }
    try{
        imagesQuery.forEach(img=>{
            let idFile = img.id.replace(/Rec/g, '')+'Upd'+id;
            document.getElementById(idFile).classList.toggle('hide');
        })
    }catch  {}
    hideButton(id, flag);
}
function hideButton(id, flag){
    let child='';
    if (flag) child='Child';
    console.log(child);
    console.log('upd'+child+id);
    document.getElementById('upd'+child+id).classList.toggle('hide');
    document.getElementById('saveButRow'+child+id).classList.toggle('hide');
    document.getElementById('cancelUpd'+child+id).classList.toggle('hide');
    document.getElementById('delColBut'+child+id).classList.toggle('hide');
}
function save(id, elements, flag, table,selectsQuery){
    hideButton(id, flag);   
    let isFirstKey = true;
    let firstKey;
    for (const key in elements) {
        if (isFirstKey) {
            isFirstKey = false;
            firstKey = elements[key];
            continue;
        }
        console.log(`UPDATE megafon.${table} SET 
        ${elements[key]} = '${document.getElementById(key+id).value}' 
        WHERE ${firstKey}=${id};`);
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
        imagesQuery.forEach(img=>{
            let idImgUpd = img.idUpd.replace(/Rec/g, '')+id;
            let pathPhoto = document.getElementById(idImgUpd).value;
            let cleanedPath = pathPhoto.replace(/^.*\\/, '');
            connection.query(`UPDATE megafon.${table} SET 
            ${img.column} = '${cleanedPath}' 
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
            let idImg = img.id.replace(/Rec/g, '')+id;
            document.getElementById(idImg).src=cleanedPath;
            document.getElementById(idImgUpd).classList.add('hide');
        })
    }catch{}
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
function addRows(table, newRow, flag,selectsQuery){
    document.getElementById(table).appendChild(newRow);
    const selectElement = document.querySelector('select');
    if (selectElement) {
        addSelect(selectsQuery);
    }
    hideButtonSaveRow(flag);
}
function canceladdRows(flag){
    let child='';
    if (flag) child='Child';
    document.getElementById('tr'+child+'Rec').remove();
    hideButtonSaveRow(flag);
}
function hideButtonSaveRow(flag){
    let child='';
    if (flag) child='Child';
    document.getElementById('addRows'+child).classList.toggle('hide');
    document.getElementById('addRowsInDB'+child).classList.toggle('hide');
    document.getElementById('canceladdRows'+child).classList.toggle('hide');
}
function addRowsInDB(table, flag){
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
        selectsQuery.forEach(opt=>{
            columnQuery+=opt.columnGoods+", ";
            inputsQuery+="'"+document.getElementById(opt.id).value+"', ";
            })
    } catch {}
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
            windowError(messageError);
            throw error;
        }
        else results;
    })
    for (const key in elements) {
        document.getElementById(key+'Rec').readOnly=true;
        document.getElementById(key+'Rec').id = key+lastElems;
    }
    hideButtonSaveRow(flag);
    let child='';
    if (flag) child='Child';
    document.getElementById('saveButRow'+child+'Rec').value=lastElems;
    document.getElementById('saveButRow'+child+'Rec').id='saveButRow'+lastElems;
    document.getElementById('cancelUpd'+child+'Rec').value=lastElems;
    document.getElementById('cancelUpd'+child+'Rec').id='cancelUpd'+lastElems;
    document.getElementById('cancelUpdBut'+child+'Rec').value=lastElems;
    document.getElementById('cancelUpdBut'+child+'Rec').id='cancelUpdBut'+lastElems;
    document.getElementById('upd'+child+'Rec').classList.toggle('hide');
    document.getElementById('upd'+child+'Rec').value=lastElems;
    document.getElementById('upd'+child+'Rec').id='upd'+lastElems;
    document.getElementById('delCol'+child+'Rec').classList.toggle('hide');
    document.getElementById('delCol'+child+'Rec').id='delCol'+lastElems;
    document.getElementById('delColBut'+child+'Rec').value=lastElems;
    document.getElementById('delColBut'+child+'Rec').id='delColBut'+lastElems;
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
    location.reload();
}
function delCol(id, table, primKey,flag){
    let child='';
    if (flag) child='Child';
    console.log(`DELETE FROM megafon.${table} WHERE ${primKey} = ${id};`);
    connection.query(`DELETE FROM megafon.${table} WHERE ${primKey} = ${id};`, function (error, results, fields){
        if (error) throw error;
    });
    document.getElementById('tr'+child+id).remove();
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
    recordTable(elements,query);
}
function addSelect(selectsQuery){
    selectsQuery.forEach(selectOpt=>{
        connection.query(selectOpt.query, function(error, results, fields){
            results.forEach(result=>{
                document.getElementById(selectOpt.id).innerHTML+='<option>'+result[selectOpt.column]+'</option>';
            })
        })
    })
}