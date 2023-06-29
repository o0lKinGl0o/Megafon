function addRowsInDBChildTable(table,column,id,selectsQueryChild){
    let columnQuery=column+', ';
    let inputsQuery=id+', ';
    let isFirstKey = true;
    let lastElement;
    try{
        if(selectsQueryChild){

            selectsQueryChild.forEach(element => {
                columnQuery+=element.columnGoods+', ';
                console.log(document.getElementById(element.id).value);
                inputsQuery+=`'${document.getElementById(element.id).value}', `;
            });
        }
    }
    catch{}
    for (let key in childElements) {
        lastElement = childElements[key];
    }
    for (const key in childElements) {
        if (isFirstKey){
            isFirstKey = false;
            continue;
        }
        if (lastElement!=childElements[key]) {
            columnQuery+=childElements[key]+', ';
            console.log(key+'Rec')
            inputsQuery+=`'${document.getElementById(key+'Rec').value}', `;
        }
        else {
            columnQuery+=childElements[key]; 
            inputsQuery+=`'${document.getElementById(key+'Rec').value}'`;
        }
    }
    console.log(`INSERT INTO megafon.${table} (${columnQuery}) values (${inputsQuery})`);
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
    document.getElementById('transbox').remove();
    childWindow(id, queryChildTable,column);
}