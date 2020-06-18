//carregar a biblioteca do express
var express = require('express');
const dbMysql = require('mysql');
var cors = require('cors');

//incluir a requisição do json parse
const bodyParser = require('body-parser');

//incializando o express
var app = express();

app.use(cors({origin: '*'}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//configurando o body parser para pegar POSTS mais tarde
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//inicializar a base de dados

//função para executar queries
function execSQLQuery(sqlQry, res) {
  var db = dbMysql.createConnection({
    host: "uninovedatabase.mysql.database.azure.com",
    user: "luismanoel@uninovedatabase",
    password : " 29032018Ln ",
    database : "quinta",
    port: 3306,
    ssl: true
  });
   
  //Connection to database
  db.connect(function (err) {
    if (err) throw err;
    console.log("Connected to Database!");
  });

  db.query(sqlQry, function (error, results, fields) {
    if (error)
      res.json(error);
    else
      res.json(results);
    db.end();
    console.log('executou!');
  });
}

//Trazer todos os usuários
app.get('/usuarios', function (req, res) {
  const sql = "select * from usuario";
  execSQLQuery(sql, res);
});

//Trazer o usuário por Id
app.get('/usuarios/:id', function (req, response) {
  const sql = `select * from usuario where idUsuario = ${req.params.id}`;
  execSQLQuery(sql, response);
});

//Salvar informações na tabela usuário
app.post('/usuarios', function(request, response){
   const {usuario, senha} = request.body;
   const sql = `insert into usuario(usuario, senha) values('${usuario}', '${senha}')`;
   console.log(sql);
   execSQLQuery(sql, response);
});

app.delete('/usuarios/:id', function(request, response){
    const id = resquest.params.id;
    const sql = `delete from usuario where idUsuario = '${id}';`;
    execSQLQuery(sql, response);
});
app.put('/usuarios/',function(request, response){
  const { usuario, senha, idUsuario } = request.body;
  const sql = `update usuario set usuario = '${usuario}', senha = '${senha}' where idUsuario = ${idUsuario} `;
  execSQLQuery(sql, response);
});

//endpoints ou endereços da web
app.get('/', function (req, res) {
  res.send('Hello World!');
});

//a porta que será exposta
app.listen(process.env.PORT || 3003, function () {
  console.log('Example app listening on port 3003!');
});

module.exports = app;