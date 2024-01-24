import Catalogo from "./catalogo.js";
import Cepas from "./cepas.js";

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
    detalleProducto = (idProducto) => {
        let producto = Catalogo.find(c => c.id == idProducto);
        return producto;
    }
    agregaProducto = (codigoProducto, cantidad) => {
        let carroCompras = JSON.parse(localStorage.getItem('carro'));
        if(!carroCompras){
            carroCompras = [];
            carroCompras.push({codigoProducto : codigoProducto, cantidad: cantidad});
            localStorage.setItem('carro',  JSON.stringify(carroCompras));
            mensajeToast("Ha agregado "+ this.detalleProducto(codigoProducto).nombre+ " al carro.");
        }else{
            let producto = carroCompras.find(c => c.codigoProducto == codigoProducto);
            if(!producto){
                carroCompras.push({codigoProducto : codigoProducto, cantidad: cantidad});
                localStorage.setItem('carro',  JSON.stringify(carroCompras));
                mensajeToast("Ha agregado "+ this.detalleProducto(codigoProducto).nombre+ " al carro.");
            }else{
                mensajeToast("El producto "+ this.detalleProducto(codigoProducto).nombre+ " ya se encuentra en el carro.");
            }
        }
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
    actualizarCantidadProducto = () => {
    
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
            obtieneProductos.forEach((producto) => {
                const leeDetalleProducto = this.detalleProducto(producto.codigoProducto);
                console.log(leeDetalleProducto.nombre + ' - Cantidad: ' + producto.cantidad);
                const elementoCarro = `
                <div class="detalle_carro">
                    <div class="foto_producto_carro"><img src="`+leeDetalleProducto.imagen+`" /></div>
                    <div class="elementos_producto">
                        <div class="titulo"><p class="">`+leeDetalleProducto.nombre+`</p></div>
                        <div class="cantidad_carro">
                            <div class="cantidad">Cantidad:<input type="number" id="quantity" name="quantity" min="1" max="5" value="`+producto.cantidad+`"/></div>
                        </div>
                        <div class="precio">
                            <span class="texto">Precio: $</span><span class="precio">`+leeDetalleProducto.precio+`</span>
                        </div>
                    </div>
                    <div class="boton_quitar">
                        <button id="elimina_`+leeDetalleProducto.id+`" class="boton_quitar_carro">X</button>
                    </div>
                </div>`;
                document.querySelector(".lista_carro").innerHTML += elementoCarro;
            });
        }else{
            document.querySelector(".lista_carro").innerHTML = "No hay elementos en el carro de compras";
        }
        const btnElimina = document.querySelectorAll('button[id^=elimina]');
        btnElimina.forEach(btnEl => {
            btnEl.addEventListener('click', event => {
                console.log("Elimina");
                const iniciaProductos = new Productos();
                const idProducto = event.target.id.split("_");
                if(confirm("Seguro que desea eliminar el producto?.")){
                    iniciaProductos.quitarProducto(idProducto[1]);
                    let obtieneProductos = JSON.parse(localStorage.getItem('carro'));
                    obtieneProductos.length == 0 ? iniciaProductos.limpiaCarro():"";
                    location.reload();
                }
            });
        });
    }
}

const btns = document.querySelectorAll('button[id^=vino]');
btns.forEach(btn => {
   btn.addEventListener('click', event => {
        const iniciaProductos = new Productos();
        const idProducto = event.target.id.split("_")
        iniciaProductos.agregaProducto(idProducto[1], 1);
   });
});

/*iniciaProductos.limpiaCarro();
iniciaProductos.agregaProducto(1, 3);*/
//agregaProducto(1, 3);
//quitarProducto(4);