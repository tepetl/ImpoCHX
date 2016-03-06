var pg = require('pg');

// https://github.com/brianc/node-postgres

var connectionString = process.env.DATABASE_URL || 'postgres://popoca:b0b054@127.0.0.1:5432/MONITOREO';
var client = new pg.Client(connectionString);
client.connect();


var operdb = {};

/**
* Método que inserta el dato
*/
operdb.insertaData = function (data){

  client.query('INSERT INTO estacion_chx (id,fecha_hora,dia,registro) VALUES ($1,$2,$3,$4)',data);

};

/**
* Método que checa si no existe el dato y en su caso inserta el registro
*/
operdb.checaExInData = function (data){
console.log("checaExInData");
  var query=client.query("SELECT COUNT(*) as cantidad FROM estacion_chx WHERE id="+data[0], function(err, result) {
	if(err){
		console.error("Error: "+err);
	}
	console.log(result);
/*	
    if(result.rows[0].cantidad==0){
      operdb.insertaData(data);
    }
*/
  });

};

/**
* Método que cierra la conexion del cliente
*/
operdb.finaliza= function(){
  client.end();
};


exports.operdb = operdb;
