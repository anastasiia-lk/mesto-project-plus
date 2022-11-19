// запустите этот файл и перейдите
// в браузере по адресу: http://localhost:3000/
import http from 'http';

// передадим обработчик
const server = http.createServer(() => {
  console.log('Пришёл запрос!');
});

server.listen(3000);