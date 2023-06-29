const contentTable=`<tr id="trRec" class="">
                        <td class="hide">
                            <select id="idCompanyRec">
                            </select>
                        </td>
                        <td>
                            <select id="clientNameRec">
                            </select>
                        </td>
                        <td><input type="date" class="dateOrderRec" value="" readonly id="dateOrderRec"></td>
                        <td><input type="text" class="сashPayRec" value="" readonly id="сashPayRec"></td>
                        <!--<td><input type="text" class="nameEmployeeRec" value="" readonly" id="nameEmployeeRec"></td>-->
                        <td>
                            <select id="nameEmployeeRec">
                            </select>
                        </td>
                        <td>
                            <button type="button" id="updRec" onclick="updCol(this.value, elements, false)" value="">Редактировать</button>
                            <button id="saveButRowRec" class="hide" type="button" onclick="save(this.value, elements, false ,table)" value="">Сохранить</button>
                        </td>
                        <td id="cancelUpdRec" class="hide"><button class="updBut" id="cancelUpdButRec" type="button" onclick="hideButton(this.value)" value="">Отмена</button></td>
                        <td id="delColRec"><button type="button" id="delColButRec" onclick="delCol(this.value,'заказы', 'Код_заказа', false)" value="">Удалить</button></td>
                        <td><button type="button" id="orderList" onclick="childWindow(this.value, queryChildTable,'код_заказа')" value="">Состав заказа</button></td>
                    </tr>`;
const contentChildTable=`
                    <tr id="trChildRec" class="">
                        <td class="hide">
                                <select id="idCompanyRec">
                                </select>
                        </td>
                        <td>
                                <select id="nameGoodsRec">
                                </select>
                        </td>
                        <td><input type="text" class="quantityRec" value="" readonly id="quantityRec"></td>
                        <td>
                            <button type="button" id="updChildRec" onclick="updCol(this.value, childElements, true)" value="">Редактировать</button>
                            <button id="saveButRowChildRec" class="hide" type="button" onclick="save(this.value, childElements, true, childTable, selectsQueryChild)" value="">Сохранить</button>
                        </td>
                        <td id="cancelUpdChildRec" class="hide"><button class="updButChild" id="cancelUpdButChildRec" type="button" onclick="hideButton(this.value, true)" value="">Отмена</button></td>
                        <td id="delColChildRec"><button type="button" id="delColButChildRec" onclick="delCol(this.value,'товары_в_покупке', 'Код_покупки', true)" value="">Удалить</button></td>
                    </tr>
`;
const elements={
                    'tr': 'Код_заказа',
                    //'clientName': 'Код_клиента',
                    //'idCompany': 'Код_компании',
                    'dateOrder': 'Дата_заказа',
                    'сashPay':'Безналичный_расчет'
                };
const childElements={
                    'tr':'Код_покупки',
                    //'nameGoods':'Код_товара',
                    'quantity':'Кол_во'
};
const table = 'заказы';
const childTable = 'товары_в_покупке';
const query=`SELECT * FROM megafon.${table};`;
let queryChildTable=`SELECT * FROM megafon.товары_в_покупке`;
const newRowChild = document.createElement('tr');
const newRow = document.createElement('tr');
newRowChild.id='trChildRec';
newRow.id='trRec';
const selectsQuery=
[
    {id:'idCompanyRec',query:   'SELECT Название_компании FROM megafon.компания;',column:'Название_компании', columnGoods:'Код_компании'},
    {id:'clientNameRec', query:'SELECT ФИО_клиента FROM megafon.клиенты;', column:'ФИО_клиента', columnGoods:'Код_клиента'},
    {id:'nameEmployeeRec',query:'SELECT ФИО_сотрудника FROM megafon.сотрудники;', column:'ФИО_сотрудника', columnGoods:'Код_сотрудника'}
];
const selectsQueryChild=
[
    {id:'idCompanyRec',query:   'SELECT Название_компании FROM megafon.компания;',column:'Название_компании', columnGoods:'Код_компании'},
    {id:'nameGoodsRec', query:'SELECT Название FROM megafon.товары;', column:'Название', columnGoods:'Код_товара'}
];
newRowChild.innerHTML=`
    <td class="hide">
        <select id="idCompanyRec">
        </select>
    </td>
    <td>
        <select id="nameGoodsRec">
        </select>
    </td>
    <td><input type="text" class="quantityRec" value="" id="quantityRec"></td>
    <td>
        <button type="button" id="updChildRec" class="hide" onclick="updCol(this.value, childElements, true)" value="">Редактировать</button>
        <button id="saveButRowRec" class="hide" type="button" onclick="save(this.value, childElements,selectsQueryChild)" value="">Сохранить</button>
    </td>
    <td id="cancelUpdRec" class="hide"><button id="cancelUpdButRec" type="button" onclick="hideButton(this.value, true)" value="">Отмена</button></td>
    <td id="delColRec" class="hide"><button type="button" id="delColButRec" onclick="delCol(this.value, 'заказы', 'Код_заказа')" value="">Удалить</button></td>
`
newRow.innerHTML = `
    <td class="hide">
        <select id="idCompanyRec">
        </select>
    </td>
    <td>
        <select id="clientNameRec">
        </select>
    </td>    
    <td><input type="date" class="dateOrderRec" value="" id="dateOrderRec"></td>
    <td><input type="text" class="сashPayRec" value="" id="сashPayRec"></td>
    <td>
        <select id="nameEmployeeRec">
        </select>
    </td>
    <td>
        <button type="button" id="updRec" class="hide" onclick="updCol(this.value, elements, false)" value="">Редактировать</button>
        <button id="saveButRowRec" class="hide" type="button" onclick="save(this.value, elements, false ,table)" value="">Сохранить</button>
    </td>
    <td id="cancelUpdRec" class="hide"><button id="cancelUpdButRec" type="button" onclick="hideButton(this.value)" value="">Отмена</button></td>
    <td id="delColRec" class="hide"><button type="button" id="delColButRec" onclick="delCol(this.value, 'заказы', 'Код_заказа')" value="">Удалить</button></td>
    <td><button type="button" id="orderList" onclick="childWindow(this.value, queryChildTable,'код_заказа')" value="">Состав заказа</button></td> 
  `;
const pK='Код_заказа';
const pKChild='Код_покупки';
queryShowTable(contentTable,query,'rowTable');
recordTable(elements,query,pK,false,selectsQuery);
const inputsFilter={
    'search-input-clientName': 'clientNameRec',
    'search-input-dateOrder': 'dateOrderRec'
};
filter(inputsFilter);

