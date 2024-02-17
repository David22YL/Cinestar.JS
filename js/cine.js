const getCine = async () =>{

    const id = new URLSearchParams(window.location.search).get('id');

    const data = await fetch(`https://oaemdl.es/cinestar_sweb_php/cines/${id}`)
    const dataa = await fetch(`https://oaemdl.es/cinestar_sweb_php/cines/${id}/tarifas`)
    const dataaa = await fetch(`https://oaemdl.es/cinestar_sweb_php/cines/${id}/peliculas`)

    if(data.status == 200 || dataa.status == 200 || dataaa.status == 200){
        const cine = await data.json();
        let html = `
        <h2>${cine.RazonSocial}</h2>
        <div class="cine-info">
            <div class="cine-info datos">
                <p>${cine.Direccion} - ${cine.Detalle}</p>
                <p>Teléfono: ${cine.Telefonos} anexo 865</p>
                <br/>
            </div>
            <img src="img/cine/${cine.id}.2.jpg"/>
        <div>
            <img style="float:left;" src="img/cine/${cine.id}.3.jpg" alt="Imagen del cine"/>
        </div>
        `
        document.getElementById('contenido-interno').innerHTML = html

        const tarifas = await data2.json();
        let htmlTarifa =``

        tarifas.forEach((tarifa, index) => {
            if(index % 2 !== 0){
                htmlTarifa += `
                <div class="fila impar">
                    <div class="celda-titulo">${tarifa.DiasSemana}</div>
                    <div class="celda">${tarifa.Precio}</div>
                </div>
            `
            }
            else{
                htmlTarifa += `
                    <div class="fila">
                        <div class="celda-titulo">${tarifa.DiasSemana}</div>
                        <div class="celda">${tarifa.Precio}</div>
                    </div>                
                `
            }
        });

        document.getElementById('tarifa').innerHTML = htmlTarifa

        const cinePeliculas = await data3.json();
        let htmlCinePeliculas = ``

        cinePeliculas.forEach((cinePelicula, index) => {
            if(index % 2 !== 0){
                htmlCinePeliculas += `
                <div class="fila impar">
                    <div class="celda-titulo">${cinePelicula.Titulo}</div>
                    <div class="celda">${cinePelicula.Horarios}</div>
                </div>
            `
            }
            else{
                htmlCinePeliculas += `
                <div class="fila">
                    <div class="celda-titulo">${cinePelicula.Titulo}</div>
                    <div class="celda">${cinePelicula.Horarios}</div>
                </div>          
                `
            }
        });
        document.getElementById('tabla-pelicula').innerHTML = htmlCinePeliculas

    }
}

getCine()