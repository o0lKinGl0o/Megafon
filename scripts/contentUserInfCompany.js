connection.query(`SELECT * FROM megafon.компания;`, 
function (error, results, fields){
    document.getElementById('nameCompany').value = results[0].Название_компании;
    document.getElementById('director').value=results[0].ФИО_директора;
    document.getElementById('phoneCompany').value=results[0].Телефон_компании;
    document.getElementById('adressCompany').value=results[0].Адрес_компании;
})
