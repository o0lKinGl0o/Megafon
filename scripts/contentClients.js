const contentTable=`<tr id="trRec" class="">
                        <td><input type="text" class="nameClientRec" value="" readonly" id="nameClientRec"></td>
                        <td><input type="text" class="idCompanyRec" value="" readonly id="idCompanyRec"></td>
                        <td><input type="text" class="contactPhoneClientRec" value="" readonly id="contactPhoneClientRec"></td>
                        <td>
                            <button type="button" id="updRec" onclick="updCol(this.value)" value="">Редактировать</button>
                            <button id="saveButRowRec" class="hide" type="button" onclick="save(this.value)" value="">Сохранить</button>
                        </td>
                        <td id="cancelUpdRec" class="hide"><button class="updBut" id="cancelUpdButRec" type="button" onclick="hideButton(this.value)" value="">Отмена</button></td>
                        <td id="delColRec"><button type="button" id="delColButRec" onclick="delCol(this.value,'клиенты', 'Код_клиента')" value="">Удалить</button></td>
                    </tr>`;
const elements={
                    'tr': 'Код_клиента',
                    'nameClient': 'ФИО_клиента',
                    'idCompany': 'Код_компании',
                    'contactPhoneClient': 'Контактный_телефон_клиента'
};
const table = 'клиенты';
const query=`SELECT * FROM megafon.${table};`;
const newRow = document.createElement('tr');
newRow.id='trRec';
newRow.innerHTML = `
    <td><input type="text" class="nameClientRec" value="" id="nameClientRec"></td>
    <td><input type="text" class="idCompanyRec" value="" id="idCompanyRec"></td>
    <td><input type="text" class="contactPhoneClientRec" value="" id="contactPhoneClientRec"></td>
    <td>
        <button type="button" id="updRec" class="hide" onclick="updCol(this.value)" value="">Редактировать</button>
        <button id="saveButRowRec" class="hide" type="button" onclick="save(this.value)" value="">Сохранить</button>
    </td>
    <td id="cancelUpdRec" class="hide"><button id="cancelUpdButRec" type="button" onclick="hideButton(this.value)" value="">Отмена</button></td>
    <td id="delColRec" class="hide"><button type="button" id="delColButRec" onclick="delCol(this.value, 'клиенты', 'Код_клиента')" value="">Удалить</button></td>
  `;
const pK='Код_клиента'; 
queryShowTable(table,contentTable);
recordTable(table,elements,query);
const inputsFilter={
    'search-input-nameClient': 'nameClientRec',
    'search-input-idCompany': 'idCompanyRec',
    'search-input-contactPhoneClient': 'contactPhoneClientRec'
};
filter(inputsFilter);

