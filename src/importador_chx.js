var fs = require("fs");
var dateFormat = require('dateformat');
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
		operdb.operdb.finaliza();
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

	console.log("\n Array de datos origen: ");
	console.log(aData);


	var fecha= new Date(aData[0]+","+aData[1]);

	if(!isNaN(fecha.getTime()/1000)){
		//console.log("fecha: "+fecha);
		var sid=formateaID(fecha);
		//console.log("id: "+sid);

		var aDataD=[];
		aDataD.push(sid);
		//aDataD.push(dateFormat(fecha, "isoDateTime"));
		aDataD.push(dateFormat(fecha, "yyyy-mm-dd\'T\'HH:MM:ss"));
		aDataD.push(obtenDiaAnno(fecha));
		aDataD.push(aData[2]);

		console.log("\n Array de datos destino: ");
		console.log(aDataD);

		operdb.operdb.checaExInData(aDataD);
	}
}


/**
* Función que convierte a la marca unica de tiempo para cada lectura
*/
function formateaID(fecha){

	var dia_anno=obtenDiaAnno(fecha);

	var aux=dia_anno*Math.pow(10,6);
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
* Función para recuperar el dia del año
* @see http://stackoverflow.com/questions/8619879/javascript-calculate-the-day-of-the-year-1-366
*/
function obtenDiaAnno(fecha){

	var start = new Date(fecha.getFullYear(), 0, 0);
	var diff = fecha - start;
	var oneDay = 1000 * 60 * 60 * 24;
	return Math.floor(diff / oneDay);

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
