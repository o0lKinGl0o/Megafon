function authorisation() {
    connection.query(`SELECT * FROM megafon.auth WHERE login = "${document.getElementById("exampleInputEmail").value}" AND passwd = "${document.getElementById("exampleInputPassword").value}";`, 
    function (error, results, fields){
        /*if (results.length == 0)
        {
            let messageError = `
                <div class = 'windowError' id ='windowError'>
                    <h3>Неверный логин или пароль</h3>
                    <button class="" onclick="closeError()">ОК</button>
                </div>`
            windowError(messageError);
        }
        else if (results.lenght != 0){  
            results.forEach(results => {
                if (document.getElementById("exampleInputEmail").value == results.login &&
                    document.getElementById("exampleInputPassword").value == results.passwd)
                {
                if(results.login == 'Топ-менеджер'){*/
                    const ipc = window.require('electron').ipcRenderer;
                    ipc.send('openChildWindow');
                /*}
                else if (results.acctype == 'менеджер'){
                    const ipc = window.require('electron').ipcRenderer;
                    ipc.send('openUserChildWindow');
                }
                }
            })
        }*/
    })
}


