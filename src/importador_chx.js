var fs = require("fs");

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



function func(data){
	console.log("Linea: "+data);
}




process.argv.forEach(function(valor,index,array){

	console.log(index+" "+valor);

	if(index>=2){
		var  input =fs.createReadStream(valor);
		leeLinea(input,func);
	}
});
