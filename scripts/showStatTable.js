let maxVal = {};
let maxValElem = 0;
let nameMaxValElem;
let maxActiveClient;
function maxGoods() {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM megafon.товары;", function (error, results, fields) {
            if (error) reject(error);
            results.forEach(element => {
                if (error) reject(error);
                maxVal = results.reduce((acc, element) => {
                    const newObject = { id: element.Название, val: 0 };
                    return { ...acc, [element.Название]: newObject };
                }, {});
                connection.query(`SELECT * FROM megafon.товары_в_покупке WHERE Код_товара='${element.Название}';`,
                    function (error, resultsOrders, fields) {
                        if (error) reject(error);
                        resultsOrders.forEach(elementOrder => {
                            for (let key in maxVal) {
                                if (key === elementOrder.Код_товара) {
                                    maxVal[key].val += Number(elementOrder.Кол_во);
                                }
                            }
                        });
                        for (let key in maxVal) {
                            if (maxValElem <= maxVal[key].val) {
                                maxValElem = maxVal[key].val;
                                nameMaxValElem = key;
                            }
                        }
                        resolve({ maxValElem, nameMaxValElem });
                    }
                );
            });
        });
    });
}
maxGoods().then(({ maxValElem, nameMaxValElem }) => {
    const maxSaleGoods = document.createElement('h3');
    maxSaleGoods.innerHTML = 'Самый продаваемый товар: '+nameMaxValElem+' его продали - '+maxValElem+' раз.';
    document.body.appendChild(maxSaleGoods);
}).catch(error => {
    console.error(error);
});
function activeClient() {
    const useQuery = `USE megafon`;
    connection.query(useQuery, function (error, results, fields) {
        if (error) throw error;
        const mainQuery = `
            SELECT заказы.Код_клиента, SUM(товары.Цена * товары_в_покупке.Кол_во) AS Сумма_заказов
            FROM заказы
            JOIN товары_в_покупке ON заказы.Код_заказа = товары_в_покупке.код_заказа
            JOIN товары ON товары_в_покупке.Код_товара = товары.Название
            GROUP BY заказы.Код_клиента
            ORDER BY Сумма_заказов DESC
            LIMIT 1;
        `;
        connection.query(mainQuery, function (error, results, fields) {
            if (error) throw error;
            results.forEach(result=>{
                console.log(result);
                const maxSalesClient = document.createElement('h3');
                maxSalesClient.innerHTML = 'Самый активный клиент: '+result.Код_клиента+' сумма его покупок - '+result.Сумма_заказов+' Руб.';
                document.body.appendChild(maxSalesClient);
            })
        });
    });
}
activeClient();
