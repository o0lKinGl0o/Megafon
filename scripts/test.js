const mysql = require('mysql');

// Создание подключения к базе данных
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'username',
  password: 'password',
  database: 'database_name',
});

// Функция для загрузки картинки и записи относительного пути в SQL
function uploadImage() {
  const input = document.getElementById('imageInput');
  const file = input.files[0];
  const reader = new FileReader();

  reader.onload = function (event) {
    const imageFile = event.target.result;

    // Генерация относительного пути к папке, где хранятся картинки
    const imagePath = 'images/' + file.name;

    // Сохранение относительного пути к картинке в базе данных
    const sql = 'INSERT INTO images (path) VALUES (?)';
    connection.query(sql, [imagePath], function (error, results, fields) {
      if (error) {
        console.error(error);
      } else {
        console.log('Относительный путь к картинке сохранен в базе данных');
      }
    });

    // Загрузка картинки на сервер по указанному пути
    // Здесь нужно реализовать сохранение файла на сервере в папку 'images'

    // Вывод картинки на экран
    const imageElement = document.createElement('img');
    imageElement.src = imageFile;
    document.body.appendChild(imageElement);
  };

  reader.readAsDataURL(file);
}

// Закрытие соединения с базой данных
connection.end();
