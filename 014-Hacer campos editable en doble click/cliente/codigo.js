var tablaactual = null;

window.onload = function(){
    console.log("ok página cargada");
    fetch('../servidor/tablas.php')
      .then(response => {
        return response.json();
      })
      .then(data => {
        let nav = document.querySelector("nav")
        nav.innerHTML = ""
        for(let i = 0;i<data.length;i++){
            let boton = document.createElement("button");
            boton.textContent = data[i];
            nav.appendChild(boton)
            boton.onclick = function(){
                console.log("Has hecho click en un boton")
                console.log(this.innerHTML)
                tablaactual = this.innerHTML
                fetch('../servidor/contenidotabla.php?tabla='+this.innerHTML)
                .then(response => {
                    return response.json();
                  })
                .then(data => {
                    console.log(data[0])
                    contenido = "<table>"
                    contenido += "<tr>"
                    for (let clave in data[0]) {
                        contenido += "<th>"+clave+"</th>"
                    }
                    contenido += "<th>Borrar</th>"
                    contenido += "</tr>"
                    identificador = null;
                    for(let i = 0;i<data.length;i++){
                        contenido += "<tr>"
                        for (let clave in data[i]) {
                            if(clave == 'Identificador'){
                                identificador = data[i][clave]
                            }
                            contenido += "<td>"+data[i][clave]+"</td>"
                        }
                        contenido += "<td><button class='borrar' identificador='"+identificador+"'>Borrar</button></td>"
                        contenido += "</tr>"
                    }
                    
                    document.querySelector("main").innerHTML = contenido
                    
                    celdas = document.querySelectorAll("td")
                    console.log("LAs celdas son:")
                    console.log(celdas)
                    for(let i = 0;i<celdas.length;i++){
                        celdas[i].ondblclick = function(){
                            console.log("Has hecho click en una celda")
                            
                        }
                    }
                    
                    let botonesborrar = document.querySelectorAll(".borrar")
                    console.log(botonesborrar)
                    for(let i = 0;i<botonesborrar.length;i++){
                        botonesborrar[i].onclick = function(){
                            console.log("vamos a borrar")
                            let cadena = '../servidor/eliminar.php?tabla='+tablaactual+'&identificador='+this.getAttribute("identificador")
                            fetch(cadena)
                        }
                    }
                })
            }
        }
    })
}