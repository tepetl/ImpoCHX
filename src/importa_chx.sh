#!/bin/bash

path=`pwd`


cd $HOME/datos/2016/chi/

ls *.txt > por_importar




for archivo in `comm -2 por_importar importado`
do

node path/importador_chx.js  $archivo 

echo $archivo >> importado



done

