const contentTable=`<tr id="trRec" class="">
                        <td><input type="text" class="nameCompanyRec" value="" readonly" id="nameCompanyRec"></td>
                        <td><input type="text" class="jobTitleRec" value="" readonly id="jobTitleRec"></td>
                        <td><input type="text" class="salaryRec" value="" readonly id="salaryRec"></td>
                        <td>
                            <button type="button" id="updRec" onclick="updCol(this.value)" value="">Редактировать</button>
                            <button id="saveButRowRec" class="hide" type="button" onclick="save(this.value)" value="">Сохранить</button>
                        </td>
                        <td id="cancelUpdRec" class="hide"><button class="updBut" id="cancelUpdButRec" type="button" onclick="hideButton(this.value)" value="">Отмена</button></td>
                        <td id="delColRec"><button type="button" id="delColButRec" onclick="delCol(this.value,'должности', 'Код_должности')" value="">Удалить</button></td>
                    </tr>`;
const elements={
                    'tr': 'Код_должности',
                    'nameCompany': 'Код_компании',
                    'jobTitle': 'Наименование_должности',
                    'salary': 'Оклад'
};
const table = 'должности';
const query=`SELECT * FROM megafon.${table};`;
const newRow = document.createElement('tr');
newRow.id='trRec';
newRow.innerHTML = `
    <td><input type="text" class="nameCompanyRec" value="" id="nameCompanyRec"></td>
    <td><input type="text" class="jobTitleRec" value="" id="jobTitleRec"></td>
    <td><input type="text" class="salaryRec" value="" id="salaryRec"></td>
    <td>
        <button type="button" id="updRec" class="hide" onclick="updCol(this.value)" value="">Редактировать</button>
        <button id="saveButRowRec" class="hide" type="button" onclick="save(this.value)" value="">Сохранить</button>
    </td>
    <td id="cancelUpdRec" class="hide"><button id="cancelUpdButRec" type="button" onclick="hideButton(this.value)" value="">Отмена</button></td>
    <td id="delColRec" class="hide"><button type="button" id="delColButRec" onclick="delCol(this.value, 'должности', 'Код_должности')" value="">Удалить</button></td>
  `;
const pK='Код_должности'; 
queryShowTable(table,contentTable);
recordTable(table,elements,query);
const inputsFilter={
    'search-input-nameCompany': 'nameCompanyRec',
    'search-input-jobTitle': 'jobTitleRec',
    'search-input-salary': 'salaryRec'
};
filter(inputsFilter);

