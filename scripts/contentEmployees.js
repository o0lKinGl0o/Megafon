const contentTable=`<tr id="trRec">
                        <td><input type="text" value="" readonly" id="nameCompanyRec"></td>
                        <td><input type="text" value="" readonly id="jobTitleRec"></td>
                        <td><input type="text" value="" readonly id="salaryRec"></td>
                        <td>
                            <button type="button" id="updRec" onclick="updCol(this.value)" value="">Редактировать</button>
                            <button id="saveButRowRec" class="hide" type="button" onclick="save(this.value)" value="">Сохранить</button>
                        </td>
                        <td id="cancelUpdRec" class="hide"><button id="cancelUpdButRec" type="button" onclick="hideButton(this.value)" value="">Отмена</button></td>
                        <td id="delColRec"><button type="button" id="delColButRec" onclick="delCol(this.value)" value="">Удалить</button></td>
                    </tr>`;
const elements = {
                    'tr': 'Код_должности',
                    'nameCompany': 'Код_компании',
                    'jobTitle': 'Наименование_должности',
                    'salary': 'Оклад'
                };
const table = 'должности';
queryShowTable(table,contentTable);
recordTable(table,elements);
