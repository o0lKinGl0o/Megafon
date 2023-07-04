const contentTable=`<tr id="trRec" class="">
                        <td><input type="text" class="nameClientRec" value="" readonly id="nameClientRec"></td>
                        <td  class="hide">
                            <select id="idCompanyRec">
                            </select>
                        </td>
                        <td><input type="text" class="contactPhoneClientRec" value="" readonly id="contactPhoneClientRec"></td>
                        <td class="hide">
                            <button type="button" id="updRec" onclick="updCol(this.value, elements, false)" value="">Редактировать</button>
                            <button id="saveButRowRec" class="hide" type="button" onclick="save(this.value, elements, false ,table)" value="">Сохранить</button>
                        </td>
                        <td id="cancelUpdRec" class="hide"><button class="updBut" id="cancelUpdButRec" type="button" onclick="hideButton(this.value)" value="">Отмена</button></td>
                        <td id="delColRec" class="hide"><button type="button" id="delColButRec" onclick="delCol(this.value,'клиенты', 'Код_клиента')" value="">Удалить</button></td>
                    </tr>`;
const elements={
                    'tr': 'Код_клиента',
                    'nameClient': 'ФИО_клиента',
                    'contactPhoneClient': 'Контактный_телефон_клиента'
};
const table = 'клиенты';
const query=`SELECT * FROM megafon.${table};`;
const newRow = document.createElement('tr');
newRow.id='trRec';
newRow.innerHTML = `
    <td><input type="text" class="nameClientRec" value="" id="nameClientRec"></td>
    <td  class="hide">
        <select id="idCompanyRec">
        </select>
    </td>
    <td><input type="text" class="contactPhoneClientRec" value="" id="contactPhoneClientRec"></td>
    <td class="hide">
        <button type="button" id="updRec" class="hide" onclick="updCol(this.value, elements, false)" value="">Редактировать</button>
        <button id="saveButRowRec" class="hide" type="button" onclick="save(this.value, elements, false ,table)" value="">Сохранить</button>
    </td>
    <td id="cancelUpdRec" class="hide"><button id="cancelUpdButRec" type="button" onclick="hideButton(this.value)" value="">Отмена</button></td>
    <td id="delColRec" class="hide"><button type="button" id="delColButRec" onclick="delCol(this.value, 'клиенты', 'Код_клиента')" value="">Удалить</button></td>
  `;
const selectsQuery=[{id:'idCompanyRec',query:'SELECT Название_компании FROM megafon.компания;',column:'Название_компании', columnGoods:'Код_компании'}];
const pK='Код_клиента'; 
queryShowTable(contentTable,query,'rowTable');
recordTable(elements,query,pK,false,selectsQuery);
const inputsFilter={
    'search-input-nameClient': 'nameClientRec',
    'search-input-contactPhoneClient': 'contactPhoneClientRec'
};
filter(inputsFilter);

