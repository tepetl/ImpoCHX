var pg=require('pg');

var connectionString = process.env.DATABASE_URL || 'postgres://popoca:b0b054@127.0.0.1:5432/MONITOREO';
var client = new pg.Client(connectionString);
client.connect();

var query=client.query('INSERT INTO estacion_teo (id,fecha_hora,dia,registro) VALUES (1,'03-05-2016',65,45534.34)', function(err,res){

  if(err){
    console.error("Error: "+err);
  }
  console.log("Resultado: "+res);

});
