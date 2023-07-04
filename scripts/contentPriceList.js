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
async function printPriceList() {
    const doc = new PDFDocument();
    doc.font('style/fonts/Intro.otf');
    doc.text(`Прайс-лист`, { align: 'center' });
    doc.text(`*******************************************************************************************`, { align: 'center' });
  
    await connection.query('SELECT Название_компании, Адрес_компании FROM megafon.компания;', function (error, results, fields) {
      if (error) throw error;
      results.forEach(element => {
        doc.text(`${element.Название_компании}`, { align: 'center' });
        doc.text(`*******************************************************************************************`, { align: 'center' });
        doc.text(`Адрес ${element.Адрес_компании}`, { align: 'center' });
      });
  
      doc.text(`*******************************************************************************************`, { align: 'center' });
      doc.fontSize(10);
      const tableData = [['Код_товара', 'Тип_товара', 'Название', 'Стоимость']];
  
      connection.query(query, function (error, results, fields) {
        if (error) throw error;
        else {
          results.forEach(element => {
            tableData.push([element.Код_товара, element.Тип_товара, element.Название, element.Цена]);
          });
  
          const tableWidth = 400; // Adjust the table width as needed
          const startX = (doc.page.width - tableWidth) / 2;
          drawTable(doc, tableData, startX);
  
          doc.text(`*******************************************************************************************`, { align: 'center' });
          doc.fontSize(16);
          doc.text('М.П.', 400, 500);
          fs.mkdir('Прайс_листы', (error) => {
            try {
              doc.pipe(fs.createWriteStream(`Прайс_листы/Прайс_лист.pdf`));
            } catch {
              doc.pipe(fs.createWriteStream(`Прайс_листы/Прайс_лист.pdf`));
            }
          });
          doc.end();
        }
      });
    });
  }
  
  function drawTable(doc, tableData, startX) {
    const cellPadding = 5;
    const cellWidth = 100;
    const lineHeight = 20;
  
    let currentY = doc.y;
  
    tableData.forEach((rowData, rowIndex) => {
      rowData.forEach((cell, colIndex) => {
        const xPos = startX + colIndex * cellWidth;
        const yPos = currentY + rowIndex * lineHeight;
  
        doc.rect(xPos, yPos, cellWidth, lineHeight).fillAndStroke('#eee');
        doc.fillColor('#000').text(cell, xPos + cellPadding, yPos + cellPadding, {
          width: cellWidth - 2 * cellPadding,
          height: lineHeight - 2 * cellPadding,
          align: 'left',
          valign: 'center',
        });
      });
    });
  
    doc.moveDown(tableData.length);
  }  