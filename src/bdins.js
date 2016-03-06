var pg = require('pg');

var connectionString = process.env.DATABASE_URL || 'postgres://popoca:b0b054@127.0.0.1:5432/MONITOREO';

var operdb = {};

operdb.checaExInData = function (data){
  var client = new pg.Client(connectionString);
  client.connect();

  var valores=[];
  valores.push(data[0]);

  var query=client.query({text: "SELECT COUNT(*) as cantidad FROM estacion_chx WHERE id=$1",values: valores});

  query.on('row',function(row){
    client.query('INSERT INTO estacion_chx (id,fecha_hora,dia,registro) VALUES ($1,$2,$3,$4)',data);
  });

  query.on('end',function(result) {
    client.end();
  });

}

exports.bdins = operdb;
