const contentTable=`<tr id="trRec" class="">
                        <td><input type="text" class="idCompanyRec" value="" readonly" id="idCompanyRec"></td>
                        <td><input type="text" class="nameEmploeeRec" value="" readonly id="nameEmploeeRec"></td>
                        <td><input type="text" class="idJobTitleRec" value="" readonly id="idJobTitleRec"></td>
                        <td><input type="date" class="dateOfBornRec" value="" readonly" id="dateOfBornRec"></td>
                        <td><input type="text" class="contactPhoneRec" value="" readonly id="contactPhoneRec"></td>
                        <td><input type="text" class="adressRec" value="" readonly id="adressRec"></td>
                        <td>
                            <button type="button" id="updRec" onclick="updCol(this.value)" value="">Редактировать</button>
                            <button id="saveButRowRec" class="hide" type="button" onclick="save(this.value)" value="">Сохранить</button>
                        </td>
                        <td id="cancelUpdRec" class="hide"><button class="updBut" id="cancelUpdButRec" type="button" onclick="hideButton(this.value)" value="">Отмена</button></td>
                        <td id="delColRec"><button type="button" id="delColButRec" onclick="delCol(this.value,'сотрудники', 'Код_сотрудника')" value="">Удалить</button></td>
                    </tr>`;
const elements={
                    'tr': 'Код_сотрудника',
                    'idCompany': 'Код_компании',
                    'nameEmploee': 'ФИО_сотрудника',
                    'idJobTitle': 'Код_должности',
                    'dateOfBorn':'Дата_рождения',
                    'contactPhone':'Контактный_телефон',
                    'adress':'Адрес'

};
const table = 'сотрудники';
const query=`SELECT * FROM megafon.${table};`;
const newRow = document.createElement('tr');
newRow.id='trRec';
newRow.innerHTML = `
    <td><input type="text" class="idCompanyRec" value="" id="idCompanyRec"></td>
    <td><input type="text" class="nameEmploeeRec" value="" id="nameEmploeeRec"></td>
    <td><input type="text" class="idJobTitleRec" value="" id="idJobTitleRec"></td>
    <td><input type="date" class="dateOfBornRec" value="" id="dateOfBornRec"></td>
    <td><input type="text" class="contactPhoneRec" value="" id="contactPhoneRec"></td>
    <td><input type="text" class="adressRec" value="" id="adressRec"></td>
    <td>
        <button type="button" id="updRec" class="hide" onclick="updCol(this.value)" value="">Редактировать</button>
        <button id="saveButRowRec" class="hide" type="button" onclick="save(this.value)" value="">Сохранить</button>
    </td>
    <td id="cancelUpdRec" class="hide"><button id="cancelUpdButRec" type="button" onclick="hideButton(this.value)" value="">Отмена</button></td>
    <td id="delColRec" class="hide"><button type="button" id="delColButRec" onclick="delCol(this.value, 'сотрудники', 'Код_сотрудника')" value="">Удалить</button></td>
  `;
const pK='Код_сотрудника'; 
queryShowTable(table,contentTable);
recordTable(table,elements,query);
const inputsFilter={
    'search-input-idCompany': 'idCompanyRec',
    'search-input-nameEmploee': 'nameEmploeeRec',
    'search-input-idJobTitle': 'idJobTitleRec',
    'search-input-dateOfBorn': 'dateOfBornRec',
    'search-input-contactPhone': 'contactPhoneRec',
    'search-input-adress': 'adressRec'
};
filter(inputsFilter);

