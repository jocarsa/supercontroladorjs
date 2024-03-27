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
                    // Creo el formulario de creación
                    contenido += "<tr>"
                    for (let clave in data[0]) {
                        contenido += "<td><input type='text' nombre='"+clave+"'></td>"
                    }
                    contenido += "<th><button id='crear'>Crear</button></th>"
                    contenido += "</tr>"
                    identificador = null;
                    for(let i = 0;i<data.length;i++){
                        contenido += "<tr>"
                        for (let clave in data[i]) {
                            if(clave == 'Identificador'){
                                identificador = data[i][clave]
                            }
                            contenido += "<td tabla='"+tablaactual+"' identificador='"+identificador+"' columna='"+clave+"'>"+data[i][clave]+"</td>"
                        }
                        contenido += "<td><button class='borrar' identificador='"+identificador+"'>Borrar</button></td>"
                        contenido += "</tr>"
                    }
                    
                    document.querySelector("main").innerHTML = contenido
                    document.querySelector("#crear").onclick = function(){
                        datos = "tabla="+tablaactual+"&"
                        console.log("enviamos datos")
                        let inputs = document.querySelectorAll("input")
                        for(let i = 0;i<inputs.length;i++){
                            if(inputs[i].getAttribute("nombre") != "Identificador"){
                                datos += inputs[i].getAttribute("nombre")+"="+inputs[i].value+"&"
                            }
                        }
                        console.log(datos)
                        fetch('../servidor/inserta.php?'+datos)
                        window.location = window.location
                        
                    }
                    celdas = document.querySelectorAll("td")
                    console.log("LAs celdas son:")
                    console.log(celdas)
                    for(let i = 0;i<celdas.length;i++){
                        celdas[i].ondblclick = function(){
                            console.log("Has hecho click en una celda")
                            this.setAttribute("contenteditable","true")
                            this.focus()
                        }
                        celdas[i].onblur = function(){
                            console.log("Has salido")
                            actualizatabla = this.getAttribute("tabla")
                            actualizacolumna = this.getAttribute("columna")
                            actualizaidentificador = this.getAttribute("identificador")
                            console.log("tabla:"+actualizatabla)
                            console.log("columna:"+actualizacolumna)
                            console.log("id:"+actualizaidentificador)
                            fetch('../servidor/actualiza.php?contenido='+this.innerHTML+'&tabla='+actualizatabla+'&columna='+actualizacolumna+'&identificador='+actualizaidentificador)
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