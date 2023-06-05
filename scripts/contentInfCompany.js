connection.query(`SELECT * FROM megafon.компания;`, 
function (error, results, fields){
    document.getElementById('nameCompany').value = results[0].Название_компании;
    document.getElementById('director').value=results[0].ФИО_директора;
    document.getElementById('phoneCompany').value=results[0].Телефон_компании;
    document.getElementById('adressCompany').value=results[0].Адрес_компании;
})
function updInfoCompany(trFa){
    document.getElementById('nameCompany').readOnly = trFa;
    document.getElementById('director').readOnly = trFa;
    document.getElementById('phoneCompany').readOnly = trFa;
    document.getElementById('adressCompany').readOnly = trFa;
    document.getElementById('cancelUpdInfoCompany').classList.toggle('hide');
    document.getElementById('updInfoCompany').classList.toggle('hide');
    document.getElementById('employee').classList.toggle('hide');
    document.getElementById('provider').classList.toggle('hide');
    document.getElementById('saveUpdInfoCompany').classList.toggle('hide');
    document.getElementById('back').classList.toggle('hide');
}
function saveUpdInfoCompany(){
    connection.query(`UPDATE megafon.компания SET 
    Название_компании = '${document.getElementById('nameCompany').value}',
    ФИО_директора = '${document.getElementById('director').value}',
    Телефон_компании = '${document.getElementById('phoneCompany').value}',
    Адрес_компании = '${document.getElementById('adressCompany').value}';`, 
    function (error, results, fields){
        if (error) throw error;
        if (results) throw results;
    })
    updInfoCompany(true);
}