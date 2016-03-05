var pg = require('pg');

// https://github.com/brianc/node-postgres

var connectionString = process.env.DATABASE_URL || 'postgres://popoca:b0b054@127.0.0.1:5432/MONITOREO';
/*var client = new pg.Client(connectionString);
client.connect();*/


var operdb = {};

/**
* Método que inserta el dato
*/
operdb.insertaData = function (data){



};

/**
* Método que checa si existe el dato
*/
operdb.checaEData = function (data){

};


exports.operdb = operdb;
