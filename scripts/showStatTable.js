connection.query("SELECT * FROM megafon.товары;", 
    function (error, results, fields){
       results.forEach(element => {
            if (error) throw error;
            connection.query(`SELECT * FROM megafon.товары_в_покупке WHERE Код_товара='${element.Название}';`, 
                function (error, resultsOrders, fields){
                    if (error) throw error;
                    resultsOrders.forEach(elementOrder => {
                        console.log(elementOrder.Код_товара);
                        
                });
                }
            )
       });
    }
)
