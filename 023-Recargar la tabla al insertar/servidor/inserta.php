<?php
    
    $conexion = mysqli_connect("localhost","gestionempresarial","gestionempresarial","gestionempresarial");

    $peticion = "
    INSERT INTO ".$_GET['tabla']." 
    VALUES (NULL,";
    foreach($_GET as $columna=>$campo){
        if($columna != 'tabla'){
            $peticion .= "'".$campo."',";
        }
    }
    $peticion = substr($peticion, 0, -1);
    $peticion .=  ");";
    echo $peticion;
    
    $resultado = mysqli_query($conexion,$peticion);


?>