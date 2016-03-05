// Checar
// https://github.com/brianc/node-postgres/wiki/Client


var pg=require('pg');

var connectionString = process.env.DATABASE_URL || 'postgres://popoca:b0b054@127.0.0.1:5432/MONITOREO';

var client = new pg.Client(connectionString);
client.connect();

var results = [];


var query = client.query('SELECT * FROM estacion_teo LIMIT 10');


query.on('row', function(row) {
            results.push(row);
        });


query.on('end', function() {
  console.log(results);
  client.end();
});
