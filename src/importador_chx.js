var fs = require("fs");
var pg = require('pg');

var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/MONITOREO';

var client = new pg.Client(connectionString);
client.connect();




function leeLinea(input,func){

	var resto= '';

	input.on('data',function(data){
		resto +=data;
		var index = resto.indexOf('\n');

		while(index > -1){
			var linea = resto.substring(0,index);
			resto=resto.substring(index+1);
			func(linea);
			index = resto.indexOf('\n');
		}

	});

	input.on('end',function(){
		if(resto.length >0){
				func(resto);
		}

	});

}


/**
* Parser de renglon a Array
*/
function func(data){
	//console.log("Linea: "+data);

	var index = data.indexOf(' ');
	var resto2=data;
	var aData=[];

	while(index > -1){
		var parte= resto2.substring(0,index);
		resto2=resto2.substring(index+1);
		if(parte.length>0){
			aData.push(parte);
		}
		index = resto2.indexOf(' ');
	}

	console.log(aData);

	var fecha= new Date(aData[0]+","+aData[1]);
	console.log("fecha: "+fecha);
	console.log("UnixTime: "+fecha.getTime()/1000)

}



/**
* Punto de entrada de la aplicacion
*/
process.argv.forEach(function(valor,index,array){

	console.log(index+" "+valor);

	if(index>=2){
		var  input =fs.createReadStream(valor);
		leeLinea(input,func);
	}
});
