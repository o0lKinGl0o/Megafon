const contentTable=`<tr id="trRec" class="">
                        <td><input type="text" class="nameGoodRec" value="" readonly id="nameGoodRec"></td>
                        <td class="hide">
                            <select id="idCompanyRec">
                            </select>
                        </td>
                        <td><input type="text" class="characteristicsRec" value="" readonly id="characteristicsRec"></td>
                        <td>
                            <input type="image" width="50px" src="" alt="" id="photoRec" readonly>
                            <input type="file" class="photoRec hide" value="" id="photoRecUpd">
                        </td>
                        <td><input type="text" class="priceRec" value="" readonly id="priceRec"></td>
                        <td><input type="text" class="manufacturerRec" value="" readonly id="manufacturerRec"></td>
                        <td><input type="text" class="quantityInStockRec" value="" readonly" id="quantityInStockRec"></td>
                        <td>
                            <select id="typeGoodRec">
                            </select>
                        </td>
                        <td class="hide">
                            <button type="button" id="updRec" onclick="updCol(this.value, elements, false)" value="">Редактировать</button>
                            <button id="saveButRowRec" class="hide" type="button" onclick="save(this.value, elements, false ,table,selectsQuery)" value="">Сохранить</button>
                        </td>
                        <td id="cancelUpdRec" class="hide"><button class="updBut" id="cancelUpdButRec" type="button" onclick="hideButton(this.value)" value="">Отмена</button></td>
                        <td id="delColRec" class="hide"><button type="button" id="delColButRec" onclick="delCol(this.value,'товары', 'Код_товара', false)" value="">Удалить</button></td>
                    </tr>`;
const elements={
                    'tr': 'Код_товара',
                    'nameGood': 'Название',
                    'characteristics': 'Характеристики',
                    'price':'Цена',
                    'manufacturer':'Производитель',
                    'quantityInStock':'Кол_во_на_складе'
};
const table = 'товары';
const query=`SELECT * FROM megafon.${table};`;
const newRow = document.createElement('tr');
const selectsQuery=
                    [
                        {id:'idCompanyRec',query:   'SELECT Название_компании FROM megafon.компания;',column:'Название_компании', columnGoods:'Код_компании'},
                        {id:'typeGoodRec', query:'SELECT Тип_товара FROM megafon.тип_товара;', column:'Тип_товара', columnGoods:'Тип_товара'}
                    ];
const imagesQuery= 
                    [
                        {id:'photoRec', column:'Фото', table:'товары', idUpd: 'photoRecUpd'}
                    ];
const newPhoto = document.createElement('input');
newPhoto.id='photoRec';
newPhoto.type='image';

newRow.id='trRec';
newRow.innerHTML = `
    <td><input type="text" class="nameGoodRec" value="" id="nameGoodRec"></td>
    <td  class="hide">
        <select id="idCompanyRec">
        </select>
    </td>
    <td><input type="text" class="characteristicsRec" value="" id="characteristicsRec"></td>
    <td id="tdphotoRec">
        <input type="file" class="photoRec" value="" id="photoRec">
    </td>
    <td><input type="text" class="priceRec" value="" id="priceRec"></td>
    <td><input type="text" class="manufacturerRec" value="" id="manufacturerRec"></td>
    <td><input type="text" class="quantityInStockRec" value="" id="quantityInStockRec"></td>
    <td>
        <select id="typeGoodRec">
        </select>
    </td>    
    <td class="hide">
        <button type="button" id="updRec" class="hide" onclick="updCol(this.value, elements, false)" value="">Редактировать</button>
        <button id="saveButRowRec" class="hide" type="button" onclick="save(this.value, elements, false, table, selectsQuery)" value="">Сохранить</button>
    </td>
    <td id="cancelUpdRec" class="hide"><button id="cancelUpdButRec" type="button" onclick="hideButton(this.value)" value="">Отмена</button></td>
    <td id="delColRec" class="hide"><button type="button" id="delColButRec" onclick="delCol(this.value, 'товары', 'Код_товара')" value="">Удалить</button></td>
  `;
const pK='Код_товара'; 
queryShowTable(contentTable,query,'rowTable');
recordTable(elements,query,pK,false,selectsQuery);
const inputsFilter={
    'search-input-nameGood': 'nameGoodRec',
    'search-input-characteristics': 'characteristicsRec',
    'search-input-price': 'priceRec',
    'search-input-manufacturer': 'manufacturerRec',
    'search-input-quantityInStock': 'quantityInStockRec'
};
filter(inputsFilter);

