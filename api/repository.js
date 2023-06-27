const Pool = require('pg').Pool;
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const md5 = require('md5');


// Define the connection string
const connectionString = 'postgresql://db:AVNS_I66K1jeFdrpdRJ41L0k@app-63537dc7-bc3a-449d-97fa-f885a1c3785c-do-user-13186318-0.b.db.ondigitalocean.com:25060/db';

// Set up the connection pool
const pool = new Pool({
  connectionString: connectionString,
  max: 10, // maximum number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
  connectionTimeoutMillis: 2000, // maximum time in milliseconds to wait for a new connection
  ssl: {
    rejectUnauthorized: false,
  },
});

const queryInsertUser = 'INSERT INTO usuarios(id, nome, login, senha, rrole) VALUES($1, $2, $3, $4, $5)';
const queryUsuarioByLogin = 'SELECT * FROM usuarios WHERE login = $1';

const queryInsertSync = 'INSERT INTO syncs(id, dados, id_caso, last_hash) VALUES($1, $2, $3, $4)';
const queryUpdateSync = 'UPDATE syncs SET dados = $1, last_hash = $3 WHERE id_caso = $2';
const querySyncByIdCaso = 'SELECT * FROM syncs WHERE id_caso = $1';


const findUserByLogin = async (login) => {
    const result = await pool.query(queryUsuarioByLogin, [login]);

    return result?.rows[0];
}

const addUser = async (user) => {
    const result = await pool.query(queryInsertUser, [uuidv4(), user.nome, user.login, bcrypt.hashSync(user.senha, 10), user.rrole]);
        
    return result?.rows;
}

const addSync = async (sync) => {
    
    var casoBanco = await pool.query(querySyncByIdCaso, [sync.dados.caso_id]); //Pega o caso inteiro

    var registro = casoBanco?.rows[0]; // Verifica se existe pelo menos um elemento, se sim, acessa o primeiro elemento do array

    if (registro) {

        if (registro.last_hash == sync.last_hash) {
            console.log(registro);
            console.log("SYNC 1", sync);
            return null;
        }

        console.log(registro);
        console.log("SYNC 2",sync);

        const idsFormulario = registro.dados.formularios.map((f) => f.id);

        sync.dados.formularios.forEach((f) => { 
            if (!idsFormulario.includes(f.id)) { // se esse id existe dentro desse array de ids
                registro.dados.formularios.push(f); // se nao tiver, ele da append e em seguida da update ok
            }
        });

        casoBanco = await pool.query(queryUpdateSync, [JSON.stringify(registro.dados), registro.dados.caso_id, md5(JSON.stringify(registro.dados))]);  

    } else {
        casoBanco = await pool.query(queryInsertSync, [ uuidv4(), JSON.stringify(sync.dados), sync.dados.caso_id, md5(JSON.stringify(sync.dados))]); //Caso novo
    }

    return casoBanco;
}

const findAllSync = async () => {
    const result = await pool.query('select * FROM syncs');

    return result?.rows;
}

module.exports = {
    findUserByLogin,
    addUser,
    findAllSync,
    addSync,
};