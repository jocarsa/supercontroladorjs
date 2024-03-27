<?php
    
    $conexion = mysqli_connect("localhost","gestionempresarial","gestionempresarial","gestionempresarial");

    $peticion = "
    UPDATE ".$_GET['tabla']." 
    SET 
    ".$_GET['columna']." = '".$_GET['contenido']."' 
    WHERE 
    Identificador = ".$_GET['identificador'].";";
    
    $resultado = mysqli_query($conexion,$peticion);


?>