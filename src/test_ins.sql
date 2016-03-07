var pg = require('pg');
var conString = "postgres://popoca:b0b054@127.0.0.1:5432/MONITOREO";

var client = new pg.Client(conString);
client.connect();

//queries are queued and executed one after another once the connection becomes available
var x = 10000;

while(x>0){
  client.query("INSERT INTO estacion_chx (id,fecha_hora,dia,registro) VALUES ($1,$2,$3,$4)", [x,'2016-08-01T12:00:00', x,x]);
x = x - 1;
}

var query = client.query("SELECT * FROM estacion_chx");
//fired after last row is emitted

query.on('row', function(row) {
  console.log(row);
});

query.on('end', function() {
  client.end();
});
