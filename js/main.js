import Catalogo from "./catalogo.js";
import Cepas from "./cepas.js";

const btns = document.querySelectorAll('button[id^=vino]');
btns.forEach(btn => {
   btn.addEventListener('click', event => {
        console.log( event.target.id );
   });
});

const nombreProducto = (idProducto) => {
    let producto = Catalogo.find(c => c.id == idProducto);
    return producto.nombre;
}

let agregaProducto = (codigoProducto, cantidad) => {
    let carroCompras = JSON.parse(localStorage.getItem('carro'));
    if(!carroCompras){
        console.log("Carro vacio");
        carroCompras = [];
        carroCompras.push({codigoProducto : codigoProducto, cantidad: cantidad});
        localStorage.setItem('carro',  JSON.stringify(carroCompras));
    }else{
        carroCompras.push({codigoProducto : codigoProducto, cantidad: cantidad});
        localStorage.setItem('carro',  JSON.stringify(carroCompras));
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
        console.log(nombreProducto(producto.codigoProducto) + ' - Cantidad: ' + producto.cantidad);
    });
}
limpiaCarro();
agregaProducto(4, 2);
agregaProducto(1, 3);
//quitarProducto(4);
obtieneCarroCompras();