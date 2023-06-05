const contentTable=`<tr id="trRec" class="">
                        <td><input type="text" class="nameCompanyProviderRec" value="" readonly" id="nameCompanyProviderRec"></td>
                        <td><input type="text" class="companyRec" value="" readonly id="companyRec"></td>
                        <td><input type="text" class="contactPhoneRec" value="" readonly id="contactPhoneRec"></td>
                        <td>
                            <button type="button" id="updRec" onclick="updCol(this.value)" value="">Редактировать</button>
                            <button id="saveButRowRec" class="hide" type="button" onclick="save(this.value)" value="">Сохранить</button>
                        </td>
                        <td id="cancelUpdRec" class="hide"><button class="updBut" id="cancelUpdButRec" type="button" onclick="hideButton(this.value)" value="">Отмена</button></td>
                        <td id="delColRec"><button type="button" id="delColButRec" onclick="delCol(this.value,'поставщики', 'Код_поставщика')" value="">Удалить</button></td>
                    </tr>`;
const elements={
                    'tr': 'Код_поставщика',
                    'nameCompanyProvider': 'Название_компании_поставщика',
                    'company': 'Код_компании',
                    'contactPhone': 'Контактный_телефон'
};
const table = 'поставщики';
const query=`SELECT * FROM megafon.${table};`;
const newRow = document.createElement('tr');
newRow.id='trRec';
newRow.innerHTML = `
    <td><input type="text" class="nameCompanyProviderRec" value="" id="nameCompanyProviderRec"></td>
    <td><input type="text" class="companyRec" value="" id="companyRec"></td>
    <td><input type="text" class="contactPhoneRec" value="" id="contactPhoneRec"></td>
    <td>
        <button type="button" id="updRec" class="hide" onclick="updCol(this.value)" value="">Редактировать</button>
        <button id="saveButRowRec" class="hide" type="button" onclick="save(this.value)" value="">Сохранить</button>
    </td>
    <td id="cancelUpdRec" class="hide"><button id="cancelUpdButRec" type="button" onclick="hideButton(this.value)" value="">Отмена</button></td>
    <td id="delColRec" class="hide"><button type="button" id="delColButRec" onclick="delCol(this.value, 'поставщики', 'Код_поставщика')" value="">Удалить</button></td>
  `;
const pK='Код_поставщика'; 
queryShowTable(table,contentTable);
recordTable(table,elements,query);
const inputsFilter={
    'search-input-nameCompanyProvider': 'nameCompanyProviderRec',
    'search-input-company': 'companyRec',
    'search-input-contactPhone': 'contactPhoneRec'
};
filter(inputsFilter);

