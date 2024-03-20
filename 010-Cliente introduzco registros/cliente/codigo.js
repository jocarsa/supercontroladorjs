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
                    contenido += "</tr>"
                    
                    for(let i = 0;i<data.length;i++){
                        contenido += "<tr>"
                        for (let clave in data[i]) {
                            contenido += "<td>"+data[i][clave]+"</td>"
                        }
                        contenido += "</tr>"
                    }
                    document.querySelector("main").innerHTML = contenido
                })
            }
        }
        
      })

}