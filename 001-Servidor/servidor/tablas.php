<?php
    
    $conexion = mysqli_connect("localhost","gestionempresarial","gestionempresarial","gestionempresarial");

    $peticion = "SHOW TABLES in gestionempresarial;";
    
    $resultado = mysqli_query($conexion,$peticion);

    $tablas = [];

    while($fila = mysqli_fetch_assoc($resultado)){
        $tablas[] = $fila['Tables_in_gestionempresarial'];
    }
    var_dump($tablas);

?>
