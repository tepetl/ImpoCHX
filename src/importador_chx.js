var fs = require("fs");
var operdb= require("./conexdb.js");




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

	if(!isNaN(fecha.getTime()/1000)){
		console.log("fecha: "+fecha);
		var sid=formateaID(fecha);
		console.log("id: "+sid);
	}
}


/**
* funcion que convierte a la marac unica de tiempo
*/
function formateaID(fecha){

	var aux=fecha.getDate()*Math.pow(10,6);
	aux+=fecha.getFullYear()*100;
	aux+=fecha.getMonth();
	aux*=100;
	aux+=fecha.getDate();
	aux*=100;
	aux+=fecha.getHours();
	aux*=100;
	aux+=fecha.getMinutes();

	return aux;
}


/**
* Punto de entrada de la aplicación
*/
process.argv.forEach(function(valor,index,array){

	//console.log(index+" "+valor);

	if(index>=2){
		var  input =fs.createReadStream(valor);
		leeLinea(input,func);
	}
});
