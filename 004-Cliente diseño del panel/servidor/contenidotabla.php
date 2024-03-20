<?php
    
    $conexion = mysqli_connect("localhost","gestionempresarial","gestionempresarial","gestionempresarial");

    $peticion = "SELECT * FROM ".$_GET['tabla'].";";
    
    $resultado = mysqli_query($conexion,$peticion);

    $contenido = [];

    while($fila = mysqli_fetch_assoc($resultado)){
        $contenido[] = $fila;
    }

    $json = json_encode($contenido);
    echo $json;

?>