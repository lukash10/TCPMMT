const repository = require('./repository.js');
const bcrypt = require("bcrypt");

const login = async (req, res) => {
    
    const auth = req.body;
    var usuario = await repository.findUserByLogin(auth.login);
    var success = false;

    if (usuario) {
        success = bcrypt.compareSync(auth.senha, usuario.senha);
        usuario.senha = undefined;
    }

    res.send( success ? { usuario: usuario, success: success } : { usuario: null, success: success } );
};

const createUser = async (req, res) => {
    var user = req.body;

    await repository.addUser(user);

    user.senha = undefined;

    res.send({ data: user });
};

const saveSync = async(req, res) => {
    const sync = req.body;

    const caso = await repository.addSync(sync);

    res.send( caso );   
}

const findAllSync = async (req, res) => {

    const casos = await repository.findAllSync();
    res.json( casos );
}

const findDashboardInfo = async (_, res) => {

  const casos = await repository.findAllSync();

  const totalFinalizado = casos.filter(c => c.dados.situacao === 'FINALIZADO').length;
  const totalPendente = casos.filter(c => c.dados.situacao === 'PENDENTE').length;

  res.json({
    qtdTotal: totalPendente + totalFinalizado,
    qtdEmAndamento: totalPendente,
    qtdFinalizados: totalFinalizado,
  });
}

const searchCaso = async (req, res) => {

  const { query } = req.query;

  const casos = await repository.findAllSync();

  const result = casos.filter(c => c.dados.titulo.includes(query));

  res.json( result );
}

module.exports = {
  login,
  createUser,
  saveSync,
  findAllSync,
  findDashboardInfo,
  searchCaso
}
