import Catalogo from "./catalogo.js";
import Cepas from "./cepas.js";

const btns = document.querySelectorAll('button[id^=vino]');
btns.forEach(btn => {
   btn.addEventListener('click', event => {
        const idProducto = event.target.id.split("_")
        agregaProducto(idProducto[1], 1);
   });
});

const nombreDetalleProducto = (idProducto) => {
    let producto = Catalogo.find(c => c.id == idProducto);
    return producto;
}

let agregaProducto = (codigoProducto, cantidad) => {
    let carroCompras = JSON.parse(localStorage.getItem('carro'));
    if(!carroCompras){
        carroCompras = [];
        carroCompras.push({codigoProducto : codigoProducto, cantidad: cantidad});
        localStorage.setItem('carro',  JSON.stringify(carroCompras));
        console.log("Ha agregado", nombreDetalleProducto(codigoProducto).nombre, ' - Cantidad:', cantidad);
    }else{
        let producto = carroCompras.find(c => c.codigoProducto == codigoProducto);
        if(!producto){
            carroCompras.push({codigoProducto : codigoProducto, cantidad: cantidad});
            localStorage.setItem('carro',  JSON.stringify(carroCompras));
            console.log("Ha agregado", nombreDetalleProducto(codigoProducto).nombre, ' - Cantidad:', cantidad);
        }else{
            console.log("El producto", nombreDetalleProducto(codigoProducto).nombre, 'ya se encuentra agregado');
        }
    }
}

const quitarProducto = (idProductoRem) => {
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

const actualizarCantidadProducto = () => {

}

const limpiaCarro = () => {
    localStorage.clear(); 
}

const obtieneCarroCompras = () => {
    let obtieneProductos = JSON.parse(localStorage.getItem('carro'));
    obtieneProductos = obtieneProductos.map(element => {
        return {
            ...element
        };
    });
    console.log(obtieneProductos);
    obtieneProductos.forEach((producto) => {
        console.log(nombreDetalleProducto(producto.codigoProducto).nombre + ' - Cantidad: ' + producto.cantidad);
    });
}

limpiaCarro();
//agregaProducto(1, 3);
//quitarProducto(4);
obtieneCarroCompras();