function queryShowTable(contentTable,queryShowTable,idTable){
    connection.query(queryShowTable, 
    function (error, results, fields){
        addContent(results, contentTable,idTable);
    })
}
function recordTable(elements,query,pK,flag,selectsQuery){
    console.log(query);
    connection.query(query,
    function (error, results, fields){
        if (error) throw error;
        results.forEach(result => {
            let isFirstKey = true;
            let firstKey;
            for (const key in elements) {
                let x = elements[key]
                if (isFirstKey) {
                    isFirstKey = false;
                    let child='';
                    if (flag) child='Child';
                    document.getElementById(key+child+'Rec').id='tr'+child+result[x];
                    document.getElementById('upd'+child+'Rec').value=result[x];
                    document.getElementById('upd'+child+'Rec').id='upd'+child+result[x];
                    document.getElementById('saveButRow'+child+'Rec').value=result[x];
                    document.getElementById('saveButRow'+child+'Rec').id='saveButRow'+child+result[x];
                    document.getElementById('cancelUpd'+child+'Rec').id='cancelUpd'+child+result[x];
                    document.getElementById('cancelUpdBut'+child+'Rec').value=result[x];
                    document.getElementById('cancelUpdBut'+child+'Rec').id='cancelUpdBut'+child+result[x];
                    document.getElementById('delCol'+child+'Rec').id='delCol'+child+result[x];
                    document.getElementById('delColBut'+child+'Rec').value=result[x];
                    document.getElementById('delColBut'+child+'Rec').id='delColBut'+child+result[x];
                    try{
                        document.getElementById('orderList').value=result[x];
                        document.getElementById('orderList').id='orderList'+result[x];
                    }catch{}
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
                    let idImgUpd = img.idUpd.replace(/Rec/g, '');
                    document.getElementById(img.idUpd).id=idImgUpd+firstKey;
                })
            } catch {}
        }) 
    })
}