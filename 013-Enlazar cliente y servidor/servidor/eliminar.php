<?php
    
    $conexion = mysqli_connect("localhost","gestionempresarial","gestionempresarial","gestionempresarial");

    $peticion = "DELETE FROM ".$_GET['tabla']." WHERE Identificador = ".$_GET['identificador'].";";
    
    $resultado = mysqli_query($conexion,$peticion);


?>