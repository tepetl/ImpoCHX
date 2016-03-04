var pg=requiere('pg');

var connectionString = process.env.DATABASE_URL || 'postgres://127.0.0.1:5432/MONITOREO';

var client = new pg.Client(connectionString);
client.connect();

var results = [];


var query = client.query('SELECT * FROM monitoreo');


query.on('row', function(row) {
            results.push(row);
        });


query.on('end', function() {
  console.log(results);
  client.end();
});
