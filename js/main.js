const mensajeToast = (textoToast) => {
    Toastify({
        text: textoToast,
        style: {background: "#ac9760"}
    }).showToast();
}

export default class Productos {
    constructor(codigoProducto, cantidad){
        this.idProducto = codigoProducto;
        this.cantidad = cantidad + 1;
    }
    detalleProducto = async (idProducto) => {
        const dataProducto = await fetch("http://api-vinos-js.s3-website-us-east-1.amazonaws.com")
        .then( response => response.json())
        .then( data => {
            return data;
        });
        let producto = dataProducto.find(c => c.id == idProducto);
        return producto;
    }
    agregaProducto = async (codigoProducto, cantidad) => {
        let carroCompras = JSON.parse(localStorage.getItem('carro'));
        let nombreVino = await this.detalleProducto(codigoProducto).then(data => {return data.wine});
        if(!carroCompras){
            carroCompras = [];
            carroCompras.push({codigoProducto : codigoProducto, cantidad: cantidad});
            localStorage.setItem('carro',  JSON.stringify(carroCompras));
            mensajeToast("Ha agregado "+ nombreVino+ " al carro.");
        }else{
            let producto = carroCompras.find(c => c.codigoProducto == codigoProducto);
            if(!producto){
                carroCompras.push({codigoProducto : codigoProducto, cantidad: cantidad});
                localStorage.setItem('carro',  JSON.stringify(carroCompras));
                mensajeToast("Ha agregado "+ nombreVino+ " al carro.");
            }else{
                mensajeToast("El producto "+ nombreVino+ " ya se encuentra en el carro.");
            }
        }
        new Productos().obtieneResumenCarro();
    }
    quitarProducto = (idProductoRem) => {
        let obtieneProductos = JSON.parse(localStorage.getItem('carro'));
        for (let i = 0; i < obtieneProductos.length; i++) {
            var item = obtieneProductos[i];
            if (item.codigoProducto == idProductoRem) {
                obtieneProductos.splice(i, 1);
                break;
            }
        }
        localStorage.setItem("carro", JSON.stringify(obtieneProductos));
    }
    actualizarCantidadProducto = (idProducto, cantidad) => {
        let carroCompras = JSON.parse(localStorage.getItem('carro'));
        let indiceCarro = carroCompras.findIndex(c => c.codigoProducto == idProducto);
        let valorCaja = document.querySelector("#cantidad_"+idProducto).value;
        carroCompras[indiceCarro].cantidad = valorCaja;
        localStorage.setItem('carro',  JSON.stringify(carroCompras));
        location.reload();
    }
    limpiaCarro = () => {
        localStorage.clear(); 
    }
    obtieneCarroCompras = () => {
        let obtieneProductos = JSON.parse(localStorage.getItem('carro'));
        if(obtieneProductos != null){
            obtieneProductos = obtieneProductos.map(element => {
                return {
                    ...element
                };
            });
            obtieneProductos.forEach(async (producto) => {
                const leeDetalleProducto = await this.detalleProducto(producto.codigoProducto);
                const elementoCarro = document.createElement('div');
                elementoCarro.className = 'detalle_carro';
                const cajaCantidad = document.createElement("input");
                cajaCantidad.setAttribute("type", "number");
                cajaCantidad.setAttribute("id", "cantidad_"+leeDetalleProducto.id);
                cajaCantidad.setAttribute("min", "1");
                cajaCantidad.setAttribute("onkeydown", "return false");
                cajaCantidad.className = 'caja_cantidad';
                cajaCantidad.setAttribute("value", producto.cantidad);
                cajaCantidad.addEventListener('change', () => {
                    new Productos().actualizarCantidadProducto(leeDetalleProducto.id, producto.cantidad);
                })
                const cantidadProducto = document.createElement('div');
                cantidadProducto.innerText = "Cantidad:";
                const elementosProducto = document.createElement('div');
                elementosProducto.className = 'elementos_producto';
                elementosProducto.innerHTML = `
                <div class="titulo"><p>`+leeDetalleProducto.wine+`</p></div>
                <span class="precio precio_texto">Precio: $`+leeDetalleProducto.price.toLocaleString()+`</span>`;
                cantidadProducto.appendChild(cajaCantidad);
                elementosProducto.appendChild(cantidadProducto);
                const fotoProductoCaro = document.createElement('div');
                fotoProductoCaro.className = 'foto_producto_carro';
                fotoProductoCaro.innerHTML = `<img src="`+leeDetalleProducto.image+`"/>`;
                const botonQuita = document.createElement("button");
                botonQuita.className = 'boton_quitar boton_quitar_carro';
                const textoBoton = document.createTextNode("X");
                botonQuita.appendChild(textoBoton);
                botonQuita.addEventListener('click', function() {
                    new Productos().btnQuitarProducto(leeDetalleProducto.id);
                }, false);
                elementoCarro.appendChild(fotoProductoCaro);
                elementoCarro.appendChild(elementosProducto);
                elementoCarro.appendChild(botonQuita);
                document.querySelector('.lista_carro').appendChild(elementoCarro);
            });
        }else{
            document.querySelector(".lista_carro").innerHTML = "No hay elementos en el carro de compras";
        }
    }
    btnQuitarProducto = (idProducto) => {
        const iniciaProductos = new Productos();
        if(confirm("Seguro que desea eliminar el producto?.")){
            iniciaProductos.quitarProducto(idProducto);
            let obtieneProductos = JSON.parse(localStorage.getItem('carro'));
            obtieneProductos.length == 0 ? iniciaProductos.limpiaCarro():"";
            location.reload();
        }
    }
    obtieneResumenCarro = async () => {
        document.querySelector('#cantidadCarro').innerHTML = ""
        let obtieneProductos = JSON.parse(localStorage.getItem('carro'));
        let total = 0;
        for (let i = 0; i < obtieneProductos.length; i++) {
            let item = obtieneProductos[i];
            let precioVino = await this.detalleProducto(item.codigoProducto).then(data => {return data.price});
            total += item.cantidad * precioVino;
        }
        const numeroCarro = document.createElement("span");
        const nbCarro = document.createTextNode(parseInt(obtieneProductos.length) + " / Total: $"+ total.toLocaleString());
        numeroCarro.appendChild(nbCarro);
        document.querySelector('#cantidadCarro').appendChild(numeroCarro);
    }
    obtieneProductosCategoria = (cantidad, claseContenedora) => {
        let l = 0;
        let limite = cantidad > 0?cantidad:99999999;
        fetch("http://api-vinos-js.s3-website-us-east-1.amazonaws.com")
        .then( response => response.json())
        .then( data => {
            data.forEach((d) => {
                if(l < limite){
                    const oferta = document.createElement('div');
                    oferta.className = 'oferta';
                    const fotoProducto = document.createElement('div');
                    fotoProducto.className = 'foto_producto';
                    fotoProducto.innerHTML = `<img src="`+d.image+`" alt="Viña: `+d.winery+`" />`;
                    const textoProducto = document.createElement("p");
                    textoProducto.className = 'texto_producto';
                    textoProducto.id = "vino_"+d.id;
                    const txtProd = document.createTextNode(d.wine);
                    textoProducto.appendChild(txtProd);
                    const textoPrecio = document.createElement('div');
                    textoPrecio.className = 'texto_precio';
                    textoPrecio.innerHTML = `<span class="texto">Precio:</span><span class="precio">$`+d.price.toLocaleString()+`</span>`;
                    const botonAgrega = document.createElement("button");
                    botonAgrega.className = 'caja_producto';
                    botonAgrega.id = "vino_"+d.id;
                    const textoBoton = document.createTextNode("agregar");
                    botonAgrega.appendChild(textoBoton);
                    oferta.appendChild(fotoProducto);
                    oferta.appendChild(textoProducto);
                    oferta.appendChild(textoPrecio);
                    oferta.appendChild(botonAgrega);
                    botonAgrega.addEventListener('click', function() {
                        new Productos().agregaProducto(d.id, 1);
                    }, false);
                    document.querySelector(claseContenedora).appendChild(oferta);
                    l++;
                }else{
                    return false;
                }
            })
        })
    }
}
