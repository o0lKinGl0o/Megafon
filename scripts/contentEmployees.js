const contentTable=`<tr id="trRec" class="">
                        <td  class="hide">
                            <select id="idCompanyRec">
                            </select>
                        </td>
                        <td><input type="text" class="nameEmploeeRec" value="" readonly id="nameEmploeeRec"></td>
                        <td>
                            <select id="idJobTitleRec">
                            </select>
                        </td>
                        <td><input type="date" class="dateOfBornRec" value="" readonly" id="dateOfBornRec"></td>
                        <td><input type="text" class="contactPhoneRec" value="" readonly id="contactPhoneRec"></td>
                        <td><input type="text" class="adressRec" value="" readonly id="adressRec"></td>
                        <td>
                            <button type="button" id="updRec" onclick="updCol(this.value, elements, false)" value="">Редактировать</button>
                            <button id="saveButRowRec" class="hide" type="button" onclick="save(this.value, elements, false ,table,selectsQuery)" value="">Сохранить</button>
                        </td>
                        <td id="cancelUpdRec" class="hide"><button class="updBut" id="cancelUpdButRec" type="button" onclick="hideButton(this.value)" value="">Отмена</button></td>
                        <td id="delColRec"><button type="button" id="delColButRec" onclick="delCol(this.value,'сотрудники', 'Код_сотрудника')" value="">Удалить</button></td>
                    </tr>`;
const elements={
                    'tr': 'Код_сотрудника',
                    'nameEmploee': 'ФИО_сотрудника',
                    'dateOfBorn':'Дата_рождения',
                    'contactPhone':'Контактный_телефон',
                    'adress':'Адрес'

};
const table = 'сотрудники';
const query=`SELECT * FROM megafon.${table};`;
const newRow = document.createElement('tr');
const selectsQuery=[
    {id:'idCompanyRec',query:'SELECT Название_компании FROM megafon.компания;',column:'Название_компании', columnGoods:'Код_компании'},
    {id:'idJobTitleRec',query:'SELECT Наименование_должности FROM megafon.должности;',column:'Наименование_должности', columnGoods:'Код_должности'}
];
newRow.id='trRec';
newRow.innerHTML = `
    <td  class="hide">
        <select id="idCompanyRec">
        </select>
    </td>    
    <td><input type="text" class="nameEmploeeRec" value="" id="nameEmploeeRec"></td>
    <td>
        <select id="idJobTitleRec">
        </select>
    </td>
    <td><input type="date" class="dateOfBornRec" value="" id="dateOfBornRec"></td>
    <td><input type="text" class="contactPhoneRec" value="" id="contactPhoneRec"></td>
    <td><input type="text" class="adressRec" value="" id="adressRec"></td>
    <td>
        <button type="button" id="updRec" class="hide" onclick="updCol(this.value, elements, false)" value="">Редактировать</button>
        <button id="saveButRowRec" class="hide" type="button" onclick="save(this.value, elements, false ,table, selectsQuery)" value="">Сохранить</button>
    </td>
    <td id="cancelUpdRec" class="hide"><button id="cancelUpdButRec" type="button" onclick="hideButton(this.value)" value="">Отмена</button></td>
    <td id="delColRec" class="hide"><button type="button" id="delColButRec" onclick="delCol(this.value, 'сотрудники', 'Код_сотрудника')" value="">Удалить</button></td>
  `;
const pK='Код_сотрудника'; 
queryShowTable(contentTable,query,'rowTable');
recordTable(elements,query,pK,false,selectsQuery);
const inputsFilter={
    'search-input-nameEmploee': 'nameEmploeeRec',
    'search-input-idJobTitle': 'idJobTitleRec',
    'search-input-dateOfBorn': 'dateOfBornRec',
    'search-input-contactPhone': 'contactPhoneRec',
    'search-input-adress': 'adressRec'
};
filter(inputsFilter);

