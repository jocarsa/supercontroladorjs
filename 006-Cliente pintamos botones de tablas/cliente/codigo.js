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
            nav.innerHTML += "<button>"+data[i]+"</button>"
        }
      })

}