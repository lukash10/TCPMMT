const axios = require('axios');

axios.post('http://localhost:3080/api/usuario', { nome: 'Testador', login: 'teste@teste.com', senha: 'teste123', rrole: 'USUARIO'});

axios.post('http://localhost:3080/api/usuario', { nome: 'Administrador', login: 'admin@admin.com', senha: 'admin123', rrole: 'ADMIN'});




// (async () =>  {
//     const r = await axios.get('http://localhost:3080/api/sync');
//     console.log(r.data[0].dados)
// })();