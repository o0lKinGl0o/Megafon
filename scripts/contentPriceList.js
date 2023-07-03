const contentTable=`<tr id="trRec" class="">
                        <td><input type="text" class="typeGoodsRec" value="" readonly id="typeGoodsRec"></td>
                        <td><input type="text" class="nameGoodRec" value="" readonly id="nameGoodRec"></td>
                        <td><input type="text" class="priceRec" value="" readonly" id="priceRec"></td>
                        <td class="hide">
                            <button type="button" id="updRec" onclick="updCol(this.value, elements, false)" value="">Редактировать</button>
                            <button id="saveButRowRec" class="hide" type="button" onclick="save(this.value, elements, false ,table,selectsQuery)" value="">Сохранить</button>
                        </td>
                        <td class="hide" id="cancelUpdRec" class="hide"><button class="updBut" id="cancelUpdButRec" type="button" onclick="hideButton(this.value)" value="">Отмена</button></td>
                        <td class="hide" id="delColRec"><button type="button" id="delColButRec" onclick="delCol(this.value,'заказы', 'Код_заказа', false)" value="">Удалить</button></td>
                    </tr>`;
const elements={
                    'tr': 'Код_товара',
                    'typeGoods': 'Тип_товара',
                    'nameGood': 'Название',
                    'price': 'Цена'
};
const table = 'товары';
const query=`SELECT Код_товара, Тип_товара, Название, Цена FROM megafon.${table};`;
const pK='Код_товара'; 
queryShowTable(contentTable,query,'rowTable');
recordTable(elements,query,pK,false);