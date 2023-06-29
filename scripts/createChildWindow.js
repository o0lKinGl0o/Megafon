function childWindow(idParent, queryChildTable,column){
    document.body.innerHTML+=
    `<div class="transbox" id="transbox">
        <div class="contentChildWindow">
            <button type="button" onclick="addRows('rowTableOrder', newRowChild, true,selectsQueryChild)" id = "addRowsChild">Добавить</button>
            <button class="hide" type="button" onclick="addRowsInDBChildTable('товары_в_покупке','код_заказа',${idParent},selectsQueryChild)" id = "addRowsInDBChild">Сохранить</button>
            <button class="hide" type="button" onclick="canceladdRows(true)" id = "canceladdRowsChild">Отмена</button>
            <table>
                <!--<col style="width: 40%;"/>-->
                <col/>
                <col/>
                <col/>
                <thead>
                <tr>
                    
                </tr>
                <tr>
                    
                </tr>
                </thead>
                <tbody id="rowTableOrder" class="rowTableOrder">
                    
                </tbody>
            </table>
            <button type="button" id="" onclick="closeChildWindow()" value="">Закрыть</button>
        </div>
    </div>`;
    document.getElementById('transbox').classList.toggle('transboxActive');
    queryChildTable+=' WHERE '+ column + '=' +idParent + ';';
    queryShowTable(contentChildTable,queryChildTable,'rowTableOrder');
    recordTable(childElements,queryChildTable,pK,true,selectsQueryChild);
}